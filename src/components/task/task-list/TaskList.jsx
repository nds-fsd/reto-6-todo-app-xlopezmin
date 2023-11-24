import { useEffect, useState } from "react";
import styles from "./TaskList.module.css";
import { Link, Outlet } from "react-router-dom";

function TaskList (props) {
    const [tareas, setTareas] = useState([]);
    const reload = props.reload;
    const selectTask = props.selectTask;

    useEffect(() => {
        getTaskList();
    }, [reload]) ;

    const getTaskList = async () => {
        try {
            const url = "http://localhost:3000/todos";
            const response = await fetch(url);
        
            if (response.status === 200){
                const json = await response.json();
                setTareas(json);          
            } else {
                console.log(await response.json());
            }
        } catch (error) {
            console.log(error);
        }
    }

    const taskOnClick = (item) => {
        selectTask(item.id);
    }

    return (
        <div className={styles.root}>
            <div>
                { tareas && tareas.map( (element) => {
                        return (
                            <Link className={styles.link} to={"/todos/"+element.id} key={element.id}>
                                <div className={styles.task}  item={element} onClick={() => taskOnClick(element)}>
                                    <div className={styles.checkbox}><input type="checkbox" checked={element.done} readOnly></input></div>
                                    <div className={styles.text}>{element.text}</div>
                                    <div className={styles.taskfield}>{element.fecha}</div>
                                </div>
                            </Link>
                        )
                    } )
                }
            </div>
            <div className={styles.details}>
                { tareas && (<div><Outlet /></div>)}
            </div>
        </div>
    )
}

export default TaskList;
