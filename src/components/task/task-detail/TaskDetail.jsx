import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./TaskDetail.module.css";
import imageRemove from "../../../assets/img/basura.svg";
import imageSave from "../../../assets/img/disco.svg";


function TaskDetail(props) {
    const [task, setTask] = useState(null);
    const [complete, setComplete] = useState(false);
    const [text, setText] = useState("");
    const [dateExpired, setDateExpired] = useState("");
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
            const url = "http://localhost:3000/todos/" + taskId;
            const response = await fetch(url);

            if(response.status === 200) {
                const json = await response.json();
                setTask(json);
                setComplete(json.done);
                setText(json.text);
                setDateExpired(json.fecha);
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
            const url = "http://localhost:3000/todos/" + taskId;

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
            const url = "http://localhost:3000/todos/" + taskId;

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
        task.fecha = dateExpired;
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

    const handlerDateOnChange = (event) => {
        setDateExpired(event.target.value)
    }

    if (loading) return <h2>🌀 Loading...</h2>;
    
    return (
        <div className={styles.root}>
            <div className={styles.fieldbox}>
                {task && (<input type="checkbox" checked={complete} onChange={handlerCheckboxDoneOnChange} />)}
                {task && (<span>{complete?"Completado":"Pendiente"}</span>)}
            </div>
            <div className={styles.fieldbox}>
                {task && (<input className={styles.text} type="text" value={text} onChange={handlerTaskOnChange} />)}   
            </div>
            <div className={styles.datebox}>
                <div>{task && (<input className={styles.date} type="date" value={dateExpired} onChange={handlerDateOnChange} />)}</div>
                <div>Fecha de vencimiento</div>
            </div>
            <div className={styles.fieldbox}>
                {task && (<button className={styles.button} onClick={handlerButtonUpdateOnClick}><img className={styles.imagebutton} src={imageSave} alt="Guardar cambios tarea" />Guardar</button>)}
                <Link to="/todos">
                    {task && (<button className={styles.button} onClick={handlerButtonRemoveOnClick}><img className={styles.imagebutton} src={imageRemove} alt="Eliminar tarea" />Eliminar</button>)}
                </Link>
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default TaskDetail;