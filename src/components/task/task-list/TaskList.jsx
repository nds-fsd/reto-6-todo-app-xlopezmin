import { useEffect, useState } from "react";
import styles from "./TaskList.module.css";
import imageSun from "../../../assets/img/sol.svg";
import imageExpiration from "../../../assets/img/calendario.svg";
import imageFrecuency from "../../../assets/img/flechas-repetir.svg";
import imageNotification from "../../../assets/img/campana.svg";
import imageNote from "../../../assets/img/nota-adhesiva.svg";
import imageCategory from "../../../assets/img/grabacion.svg";
import imageFavorite from "../../../assets/img/estrella.svg";


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

    return (
        <>




        </>
    )
}

export default TaskList;
