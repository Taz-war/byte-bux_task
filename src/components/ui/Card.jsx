import React from 'react';
import Swal from "sweetalert2";

const Card = ({ task, setEditTask, setOpenForm, deleteTask, toggleTaskStatus }) => {
    const handleEditTask = (data) => {
        setEditTask(data);
        setOpenForm(true);
    };
    const deleteClicked = async ( id)=>{
        
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTask(task._id)
                Swal.fire({
                    title: "Deleted!",
                    text: "Your Task has been deleted.",
                    icon: "success"
                });

            }
        });
    }

    return (
        <div className={`bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200`}>
            <div className={`px-4 py-2 sm:px-6 ${task.completed ? 'bg-green-400' : 'bg-red-400'}`}>
                <h2 className="text-xl font-bold">{task.title}</h2>
            </div>
            <div className="px-4 py-2 sm:p-6">{task.description}</div>
            <div className="px-4 py-2 sm:px-6">
                <div className="mt-2">
                    <button
                        onClick={() => toggleTaskStatus(task._id)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2 font-semibold"
                    >
                        {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                    </button>
                    <button
                        onClick={() => handleEditTask(task)}
                        className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2 font-semibold"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => deleteClicked(task._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded-md font-semibold"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
