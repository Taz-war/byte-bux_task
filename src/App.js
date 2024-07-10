import logo from './logo.svg';
import './App.css';
import TaskList from './pages/TaskList';
import Card from './components/ui/Card';

function App() {
  return (
    <div className=" container bg-slate-600 mx-auto">
      <TaskList />
      {/* <Card /> */}
    </div>
  );
}

export default App;
