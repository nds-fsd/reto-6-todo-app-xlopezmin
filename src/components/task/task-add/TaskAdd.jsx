import { useEffect, useState } from "react";
import styles from "./TaskAdd.module.css";


function TaskAdd() {
    const [title, setTitle] = useState("");
    // const [date, setDate] = useState("");
    // const [state, setState] = useState(false);

    const handlerTitleOnChange = (event) => {
        setTitle(event.target.value);
        console.log("handlerTitleOnChange().title", title);
    }

    const handlerButtonOnClick = async () => {
        try{
            console.log("handlerButtonOnClick().title",title);

            const url = "http://localhost:3000/todo";
            const newTask = {
                text: title,
                fecha: "2023-11-17",
                done: false
            };
            
            const response = await fetch(url, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newTask)
            });
            console.log("response:", response);

            if(response.ok){
                setTitle("");
            } else {
                console.log("response.ok:", response.ok);
            }

        } catch(error) {
            console.log(error);
        }        
    }
    
    return (
        <>
            <div>
                <input type="text" value={title} onChange={handlerTitleOnChange} placeholder="Intruduce descripción de la tarea"></input>
                <button onClick={handlerButtonOnClick}>Agregar</button>
            </div>
        </>
    )
}

export default TaskAdd;