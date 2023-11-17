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


function TaskList () {
    const [tareas, setTareas] = useState(null);

    useEffect(() => {
        console.log("useEffect");
        getTaskList();
    }, []) ;

    const getTaskList = async () => {
        try {
            const url = "http://localhost:3000/todo";
            const response = await fetch(url);
            console.log("getTaskList().response:", response);
        
            if (response.ok){
                const json = await response.json();
                setTareas(json);
                console.log("json:", json, "typeof", typeof(json));
                console.log("taskList:", tareas);                
            } else {
                console.log("response.ok:", response.ok);    
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handlerDeleteTaskOnClick = async(id) => {
        id = 0;
        try {
            console.log("deleteTask():", id);
            const url = "http://localhost:3000/todo/" + id;

            const response = await fetch(url, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"}
            });

            if (response.ok) {
                console.log("deleteTask().response.ok:", response.ok);
            } else {
                console.log("deleteTask().response.ok:", response.ok);
            }
        } catch(error) {
            console.log("deleteTask().id:", id);
        }
    }

    return (
        <>
            <div>
                <span>Título tarea 1</span>
                <button key="0" onClick={handlerDeleteTaskOnClick}>
                    <img key="0" className={styles.images} src={imageDelete} alt="Eliminar tarea"/>
                </button>
            </div>
            <div>
                <span>Título tarea 2</span>
                <button key="1" onClick={handlerDeleteTaskOnClick}>
                    <img key="1" className={styles.images} src={imageDelete} alt="Eliminar tarea"/>
                </button>
            </div>
            
        </>
    )
}

export default TaskList;
