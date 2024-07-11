export const deleteData = async (id) => {
    try {
        const response = await fetch(`https://byte-bux-backend-1.onrender.com/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log({result})
        return result;
    } catch (error) {
        console.error('There was an error!', error);
        return null;
    }
};
