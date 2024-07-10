import React, { useState, useEffect } from 'react';

const ModalForm = ({ isOpen, onClose, onSubmit, initialTask }) => {
    const [task, setTask] = useState({ title: '', description: '', completed: false });

    useEffect(() => {
        if (initialTask) {
            setTask(initialTask);
        } else {
            setTask({ title: '', description: '', completed: false });
        }
    }, [initialTask]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTask({
            ...task,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(task);
        setTask({ title: '', description: '', completed: false })
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">{initialTask ? 'Edit Task' : 'Add Task'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
                        <input
                            type="text"
                            name="title"
                            value={task.title}
                            onChange={handleChange}
                            placeholder='Task Title'
                            className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Task Description</label>
                        <textarea
                            name="description"
                            placeholder='Description of the task'
                            value={task.description}
                            onChange={handleChange}
                            className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4 mt-3">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                name="completed"
                                checked={task.completed}
                                onChange={handleChange}
                                className="form-checkbox"
                            />
                            <span className="ml-2">Completed</span>
                        </label>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-1 rounded-xl mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-1 rounded-xl"
                        >
                            {initialTask ? 'Update Task' : 'Add Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalForm;
