import { useEffect, useState } from "react";
import styles from "./TaskDetail.module.css";
import imageRemove from "../../../assets/img/basura.svg";


function TaskDetail(props) {
    const [task, setTask] = useState(null);
    const [complete, setComplete] = useState(false);
    const [text, setText] = useState("");
    const [isUpdate, setIsUpdate] = useState(false);
    const [loading, setLoading] = useState(false);
    let taskId = props.taskId;
    const setReloadList = props.setReload;

    useEffect(() => {
        if (taskId) getId();
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
                setComplete(json.done);
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

    const remove = async () => {
        try {
            const url = "http://localhost:3000/todo/" + taskId;

            const response = await fetch(url, {
                method: "DELETE"
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
        task.done = complete;
        setTask(task);
    }

    const handlerButtonRemoveOnClick = () => {
        remove();
        setReloadList(new Date());
        setTask(null);
    }

    const handlerCheckboxDoneOnChange = () => {
        setComplete(!complete);
    }

    if (loading) return <h2>🌀 Loading...</h2>;
    
    return (
        <>
            <div>
                {task && (<input type="checkbox" checked={complete} onChange={handlerCheckboxDoneOnChange} />)}
                {task && (<span>{complete?"Completado":"Pendiente"}</span>)}
            </div>            
            {task && (<input type="text" value={text} onChange={handlerTaskOnChange} />)}
            {task && (<p>Fecha: {task.fecha}</p>)}
            {task && (<button onClick={handlerButtonRemoveOnClick}><img className={styles.images} src={imageRemove} alt="Eliminar tarea" /></button>)}
            {task && (<button onClick={handlerButtonUpdateOnClick}>Guardar</button>)}
        </>
    )
}

export default TaskDetail;