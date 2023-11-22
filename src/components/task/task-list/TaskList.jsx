import { useEffect, useState } from "react";
import styles from "./TaskList.module.css";
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
        console.log("TaskList.useEffect.reload:", reload);
        getTaskList();
    }, [reload]) ;

    const getTaskList = async () => {
        try {
            const url = "http://localhost:3000/todo";
            const response = await fetch(url);
        
            if (response.status === 200){
                const json = await response.json();
                setTareas(json);
          
            } else {
                console.log("response.ok:", response.ok);    
            }
        } catch (error) {
            console.log(error);
        }
    }

    const taskOnClick = (item) => {
        selectTask(item.id);
    }

    return (
        <>
            { tareas && tareas.map( (element) => {
                    return (
                        <div className={styles.task} key={element.id} item={element} onClick={() => taskOnClick(element)}>
                            <div className={styles.taskfield}>{element.id}</div>
                            <div className={styles.taskfield}>{element.text}</div>
                            <div className={styles.taskfield}>{element.fecha}</div>
                            <div className={styles.taskfield}>{element.done}</div>
                        </div>
                    )
                } )
            }

        </>
    )
}

export default TaskList;
