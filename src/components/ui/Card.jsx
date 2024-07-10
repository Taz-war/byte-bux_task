import React from 'react';

const Card = ({ task, setEditTask, setOpenForm, deleteTask, toggleTaskStatus }) => {
    const handleEditTask = (data) => {
        setEditTask(data);
        setOpenForm(true);
    };

    return (
        <div className={`bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200`}>
            <div className={`px-4 py-2 sm:px-6 ${task.completed ? 'bg-green-400' : 'bg-red-400'}`}>
                <h2 className="text-xl font-bold">{task.title}</h2>
            </div>
            <div className="px-4 py-2 sm:p-6">{task.description}</div>
            <div className="px-4 py-2 sm:px-6">
                <div className="mt-2">
                    <button
                        onClick={() => toggleTaskStatus(task.id)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2"
                    >
                        {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                    </button>
                    <button
                        onClick={() => handleEditTask(task)}
                        className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => deleteTask(task.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded-md"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
