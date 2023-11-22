import { useState } from 'react';
import TaskList from './components/task/task-list/TaskList';
import TaskAdd from './components/task/task-add/TaskAdd';
import TaskDetail from './components/task/task-detail/TaskDetail';
import './App.css'

function App() {
  const [reload, setReload] = useState(false);
  const [taskId, setTaskId] = useState(null);

  const reloadPage = () => {
    setReload(!reload);
  }

  const selectTask = (id) => {
    console.log("selectTask(id):", id);
    setTaskId(id);
  }

  return (
    <div>
      <h1>App: Todo</h1>
      <div>
        <TaskAdd reloadPage={reloadPage}/>
      </div>
      <div>
        <p>Lista de tareas</p>
        <TaskList reload={reload} selectTask={selectTask} />
      </div>
      <div>
        <p>Detalle tarea</p>
        <TaskDetail taskId={taskId}/>
      </div>      
    </div>
  );
}

export default App
