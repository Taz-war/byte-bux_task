export const PostData = async (data) => {
    try {
        const response = await fetch('https://byte-bux-backend-1.onrender.com/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result; // return the parsed JSON response
    } catch (error) {
        console.error('There was an error!', error);
        return null;
    }
};
