import { useState } from 'react';
import TaskList from './components/task/task-list/TaskList';
import TaskAdd from './components/task/task-add/TaskAdd';
import TaskDetail from './components/task/task-detail/TaskDetail';
import './App.css'

function App() {
  const [reload, setReload] = useState(false);

  const reloadPage = () => {
    setReload(!reload);
  }

  return (
    <div>
      <h1>App: Todo</h1>
      <div>
        <TaskAdd reloadPage={reloadPage}/>
      </div>
      <div>
        <p>Lista de tareas</p>
        <TaskList reload={reload}/>
      </div>
      <div>
        <p>Detalle tarea</p>
        <TaskDetail id = "1"/>
      </div>      
    </div>
  );
}

export default App
