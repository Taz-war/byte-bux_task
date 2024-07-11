import React, { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import ModalForm from '../components/ModalForm';
import { PostData } from '../libs/PostData';
import { fetchData } from '../libs/fetchData';
import { deleteData } from '../libs/deleteData';
import { updateData, updateStatus } from '../libs/updateData';
import Swal from "sweetalert2";// Ensure you have the correct import path

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editTask, setEditTask] = useState(null);
    const [openForm, setOpenForm] = useState(false);
    const [loader, setLoader] = useState(false)

    const fetchTasks = async () => {
        
        let timerInterval;
        Swal.fire({
            title: "Fetching Task",
            html: "Loading ...",
            // timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
            },
        })
        const response = await fetchData();
        setLoader(false)
        if (response) {
            setTasks(response);
            console.log(response)
        }
        Swal.close();
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleDeleteTask = async (id) => {
        console.log(id)
        if (id) {
            const response = await deleteData(id);
            console.log(response);
            if (response) {
                setTasks(tasks.filter((task) => task._id !== id));
            }
        }
    };

    const handleToggleTaskStatus = async (id) => {
        const task = tasks.find((task) => task._id === id);
        if (task) {
            const response = await updateStatus(id, { completed: !task.completed });
            if (response) {
                setTasks(tasks.map((t) => (t._id === id ? { ...t, completed: !t.completed } : t)));
                console.log('Task status updated:', response);
            }
        }
    };

    const closeModal = () => {
        setOpenForm(false);
        setEditTask(null);
    };

    const handleFormSubmit = async (task) => {
        if (editTask) {
            const response = await updateData(editTask._id, task);
            if (response) {
                await fetchTasks()
                setEditTask(null);
                console.log('Task updated with ID:', response);
            } else {
                console.log('Failed to update task.');
            }
        } else {
            const response = await PostData(task);
            if (response && response.insertedId) {
                setTasks([...tasks, { ...task, _id: response.insertedId }]);
                console.log('Task added with ID:', response.insertedId);
            } else {
                console.log('Failed to add task.');
            }
        }
        closeModal();
    };

    return (
        <div className="p-4">
            <h1 className="text-4xl font-extrabold mb-4 text-white">Task List</h1>
            <div className="mb-4 text-right">
                <button
                    onClick={() => {
                        setEditTask(null); // Reset editTask to null
                        setOpenForm(true);
                    }}
                    className="bg-blue-500 text-white p-2 rounded-lg font-semibold"
                >
                    Add Task
                </button>
            </div>
            <ul className="space-y-2">
                {tasks.map((task, index) => (
                    <Card
                        key={task._id}
                        task={task}
                        setEditTask={setEditTask}
                        setOpenForm={setOpenForm}
                        deleteTask={handleDeleteTask}
                        toggleTaskStatus={handleToggleTaskStatus}
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
