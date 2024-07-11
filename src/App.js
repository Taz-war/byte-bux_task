import logo from './logo.svg';
import './App.css';
import TaskList from './pages/TaskList';
import Card from './components/ui/Card';

function App() {
  return (
    <div className=" container bg-slate-600 mx-auto p-3">
      <TaskList />
    </div>
  );
}

export default App;
