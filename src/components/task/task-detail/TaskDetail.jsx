import { useEffect, useState } from "react";
import styles from "./TaskDetail.module.css";
import imageRemove from "../../../assets/img/basura.svg";


function TaskDetail(props) {
    const [task, setTask] = useState({});
    const [text, setText] = useState("");
    const [isUpdate, setIsUpdate] = useState(false);
    const [loading, setLoading] = useState(false);
    const taskId = props.taskId;
    const setReloadList = props.setReload;

    useEffect(() => {
        getId();        
    }, [taskId]);

    useEffect(() => {
        if (isUpdate) {
            update();
            setIsUpdate(false);
            setReloadList(new Date());
        }
    }, [isUpdate]);

    const getId = async () => {
        try {
            setLoading(true);
            const url = "http://localhost:3000/todo/" + taskId;
            const response = await fetch(url);

            if(response.status === 200) {
                const json = await response.json();
                setTask(json);
                setText(json.text);
            } else {
                console.log(await response.json());
            }
        } catch(error) {
            console.log(error);
        }
        setLoading(false);
    }

    const update = async () => {
        try {
            const url = "http://localhost:3000/todo/" + taskId;

            const response = await fetch(url, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(task)
            });
            
            if(!response.status === 200) console.log(await response.json());

        } catch(error) {
            console.log(error);
        }
    }

    const handlerTaskOnChange = (event) => {
        setText(event.target.value);
    }

    const handlerButtonUpdateOnClick = () => {
        setIsUpdate(!isUpdate);
        task.text = text;
        setTask(task);
    }

    if (loading) return <h2>🌀 Loading...</h2>;
    if (!task) return <h2>Tarea no encontrada</h2>;

    return (
        <>
            <input type="text" value={text} onChange={handlerTaskOnChange} on/>
            <p>Fecha: {task.fecha}</p>
            <p>Estado: {String(task.done)}</p>
            <img className={styles.images} src={imageRemove} alt="Eliminar tarea" />
            <button onClick={handlerButtonUpdateOnClick}>Guardar</button>
        </>
    )
}

export default TaskDetail;