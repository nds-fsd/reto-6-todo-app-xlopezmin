import { useEffect, useState } from "react";
import styles from "./TaskDetail.module.css";
import imageRemove from "../../../assets/img/basura.svg";


function TaskDetail(props) {
    const [task, setTask] = useState({});
    const [loading, setLoading] = useState(false);
    const taskId = props.taskId;

    useEffect(() => {
        getId(taskId);        
    }, [taskId]);

    const getId = async () => {
        try {
            setLoading(true);
            const url = "http://localhost:3000/todo/" + taskId;
            const response = await fetch(url);

            if(response.status === 200) {
                const json = await response.json();
                setTask(json);                
            } else {
                console.log("TaskDetail.response.status:", response.status);
            }
        } catch(error) {
            console.log(error);
        }
        setLoading(false);
    }

    if (loading) return <h2>🌀 Loading...</h2>;
    if (!task) return <h2>Tarea no encontrada</h2>;

    return (
        <>
            <input type="text" value={task.text} />
            <p>Fecha: {task.fecha}</p>
            <p>Estado: {String(task.done)}</p>
            <img className={styles.images} src={imageRemove} alt="Eliminar tarea" />
        </>
    )
}

export default TaskDetail;