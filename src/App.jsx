import { useState } from 'react';
import TaskList from './components/task/task-list/TaskList';
import TaskAdd from './components/task/task-add/TaskAdd';
import TaskDetail from './components/task/task-detail/TaskDetail';
import { Routes, Route, Link } from "react-router-dom";
import './App.css'

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
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/todos">Tareas</Link>
          </li>
          <li>
            <Link to="/logs">Log</Link>
          </li>
        </ul>
      </nav>
      <h1>App: Todo</h1>
      <TaskAdd reloadPage={reloadPage}/>
      <Routes>
          <Route path='/todos' element={<TaskList reload={reload} selectTask={selectTask} />}>
            <Route path=':id' element={<TaskDetail taskId={taskId} setReload={setReload}/>}></Route>        
          </Route>        
      </Routes>
    </div>
  );
}

export default App
