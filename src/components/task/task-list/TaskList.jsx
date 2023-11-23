import { useEffect, useState } from "react";
import styles from "./TaskList.module.css";
import { Link, Outlet } from "react-router-dom";

import imageSun from "../../../assets/img/sol.svg";
import imageExpiration from "../../../assets/img/calendario.svg";
import imageFrecuency from "../../../assets/img/flechas-repetir.svg";
import imageNotification from "../../../assets/img/campana.svg";
import imageNote from "../../../assets/img/nota-adhesiva.svg";
import imageCategory from "../../../assets/img/grabacion.svg";
import imageFavorite from "../../../assets/img/estrella.svg";
import imageDelete from "../../../assets/img/basura.svg";


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
            { tareas && (<div><Outlet /></div>)}
            
        </div>
    )
}

export default TaskList;
