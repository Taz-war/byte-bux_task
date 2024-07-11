export const updateData = async (id, data) => {
    try {
        const response = await fetch(`https://byte-bux-backend-1.onrender.com/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('There was an error!', error);
        return null;
    }
};

export const updateStatus = async (id, update) => {
    try {
        const response = await fetch(`https://byte-bux-backend-1.onrender.com/tasks/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(update)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('There was an error!', error);
        return null;
    }
};
