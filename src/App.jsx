import TaskList from './components/task/task-list/TaskList';
import TaskAdd from './components/task/task-add/TaskAdd';
import TaskDetail from './components/task/task-detail/TaskDetail';
import './App.css'

function App() {

  return (
    <div>
      <h1>App: Todo</h1>
      <div>
        <p>Agrea nuevas tareas:</p>
        <TaskAdd/>
      </div>
      <div>
        <p>Lista de tareas</p>
        <TaskList/>
      </div>
      <div>
        <p>Detalle tarea</p>
        <TaskDetail id = "1"/>
      </div>      
    </div>
  );
}

export default App
