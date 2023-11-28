import { useEffect, useState } from "react";
import styles from "./TaskAdd.module.css";
import imageAdd from "../../../assets/img/agregar.svg"


function TaskAdd(props) {
    const [title, setTitle] = useState("");

    const handlerTitleOnChange = (event) => {
        setTitle(event.target.value);
    }

    const handlerButtonOnClick = async () => {
        try{
            const url = "http://localhost:3000/todos";
            const date = (new Date().getFullYear()) + "-" + (new Date().getMonth()+1) + "-" + (new Date().getDate());
            const newTask = {
                text: title,
                fecha: date,
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
            <div>
                <input className={styles.text} type="text" value={title} onChange={handlerTitleOnChange} placeholder="Agregar una tarea"></input>
            </div>
            <div>
                <button className={styles.button} onClick={handlerButtonOnClick}>
                    <img className={styles.image16} src={imageAdd} alt="Agregar tarea" />
                </button>
            </div>
        </div>
    )
}

export default TaskAdd;