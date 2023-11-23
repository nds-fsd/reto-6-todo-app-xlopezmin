import { useEffect, useState } from "react";
import styles from "./TaskAdd.module.css";


function TaskAdd(props) {
    const [title, setTitle] = useState("");

    const handlerTitleOnChange = (event) => {
        setTitle(event.target.value);
    }

    const handlerButtonOnClick = async () => {
        try{
            const url = "http://localhost:3000/todos";
            const newTask = {
                text: title,
                fecha: "2023-11-21",
                done: false
            };
            
            const response = await fetch(url, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newTask)
            });
            
            if(response.status === 201){
                setTitle("");
                props.reloadPage(true);                
            } else {
                console.log(response.body);
            }

        } catch(error) {
            console.log(error);
        }        
    }
    
    return (
        <div className={styles.root}>
            <div>Agregar nuevas tareas:</div>
            <div>
                <input type="text" value={title} onChange={handlerTitleOnChange} placeholder="Intruduce descripción de la tarea"></input>
                <button onClick={handlerButtonOnClick}>Agregar</button>
            </div>
        </div>
    )
}

export default TaskAdd;