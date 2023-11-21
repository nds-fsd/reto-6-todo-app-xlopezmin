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
    const [tareas, setTareas] = useState(null);
    const reload = props.reload;

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

    return (
        <>
            { tareas && tareas.map( (element) => {
                    return (
                        <div className={styles.task} key={element.id}>
                            <div>{element.id}</div>
                            <div>{element.text}</div>
                            <div>{element.fecha}</div>
                            <div>{element.done}</div>
                        </div>
                    )
                } )
            }

        </>
    )
}

export default TaskList;
