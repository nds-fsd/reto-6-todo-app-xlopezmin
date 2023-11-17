import { useEffect, useState } from "react";
import styles from "./TaskDetail.module.css";


function TaskDetail({id}) {
    const [task, setTask] = useState(null);

    useEffect((id) => {
        console.log("TaskDetail.useEffect():", id);
        getId(id);
    }, []);

    const getId = async (id) => {
        try {
            const url = "http://localhost:3000/todo/" + "1";
            const response = await fetch(url);
            console.log("getId.response():", response);

            if(response.ok) {
                const json = await response.json();
                setTask(json);
                console.log("getId().json", json);
                console.log("getId().task", task);
            } else {
                console.log("getId().response.ok", response.ok);
            }

        } catch(error) {
            console.log(error);
        }
    }

    return (
        <>
            <p>Tarea:</p>
        </>
    )
}

export default TaskDetail;