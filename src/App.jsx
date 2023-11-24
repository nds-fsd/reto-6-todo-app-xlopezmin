import { useState } from 'react';
import TaskList from './components/task/task-list/TaskList';
import TaskAdd from './components/task/task-add/TaskAdd';
import TaskDetail from './components/task/task-detail/TaskDetail';
import { Routes, Route, Link } from "react-router-dom";
import styles from './App.module.css';
import imageTasks from './assets/img/hogar.svg'
import imagePending from './assets/img/cuadrado.svg'
import imageComplete from './assets/img/angulo-cuadrado-abajo.svg'
// import './App.css'

function App() {
  const [reload, setReload] = useState(false);
  const [taskId, setTaskId] = useState(null);

  const reloadPage = () => {
    setReload(!reload);
  }

  const selectTask = (id) => {
    setTaskId(id);
  }

  return (
    <>
      <div className={styles.head}>
      </div>
      <div className={styles.components}>
        <nav className={styles.nav}>
          <ul className={styles.lu}>
            <li className={styles.li}>
              <img className={styles.image16} src={imageTasks} alt="Tareas" />
              <Link className={styles.link} to="/todos">Tareas</Link>
            </li>
            <li className={styles.li}>
            <img className={styles.image16} src={imagePending} alt="Tareas" />
              <Link className={styles.link} to="/todos?done=false">Tareas pendientes</Link>
            </li>
            <li className={styles.li}>
              <img className={styles.image16} src={imageComplete} alt="Tareas" />
              <Link className={styles.link} to="/todos?done=true">Tareas completadas</Link>
            </li>
          </ul>
        </nav>
        <div>
          <div className={styles.subhead}>
            <img className={styles.image32} src={imageTasks} alt="Tareas" />
            <h1>Tareas</h1>
          </div>        
          <div>
            <TaskAdd reloadPage={reloadPage}/>
          </div>
          <div>
            <Routes>
              <Route path='/todos' element={<TaskList reload={reload} selectTask={selectTask} />}>
                <Route path=':id' element={<TaskDetail taskId={taskId} setReload={setReload}/>}></Route>        
              </Route>        
          </Routes>
          </div>          
        </div>

      </div>
    </>
  );
}

export default App
