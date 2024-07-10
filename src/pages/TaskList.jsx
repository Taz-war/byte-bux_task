import React, { useState } from 'react';
import Card from '../components/ui/Card';
import ModalForm from '../components/ModalForm';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editTask, setEditTask] = useState(null);
    const [openForm, setOpenForm] = useState(false);

    const closeModal = () => {
        setOpenForm(false);
        setEditTask(null);
    };

    const handleFormSubmit = (task) => {
        if (editTask) {
            setTasks(tasks.map((t) => (t.id === editTask.id ? { ...task, id: editTask.id } : t)));
        } else {
            setTasks([...tasks, { ...task, id: Date.now() }]);
        }
        closeModal();
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Task List</h1>
            <div className="mb-4 text-right">
                <button
                    onClick={() => {
                        setEditTask(null); // Reset editTask to null
                        setOpenForm(true);
                    }}
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Add Task
                </button>
            </div>
            <ul className="space-y-2">
                {tasks.map((task, index) => (
                    <Card
                        key={index}
                        task={task}
                        setEditTask={setEditTask}
                        setOpenForm={setOpenForm}
                        deleteTask={(id) => setTasks(tasks.filter((task) => task.id !== id))}
                        toggleTaskStatus={(id) =>
                            setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
                        }
                    />
                ))}
            </ul>
            <ModalForm
                isOpen={openForm}
                onClose={closeModal}
                onSubmit={handleFormSubmit}
                initialTask={editTask}
            />
        </div>
    );
};

export default TaskList;
