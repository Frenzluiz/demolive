import React from 'react';
import { deletePlayer } from '../Services/PlayerService';

const DeletePlayer = ({ id, onDelete }) => { // Destructure the `id` and `onDelete` props
    const handleDelete = async () => { // No need to pass `playerId`, use `id` directly from props
        try {
            await deletePlayer(id);  // Assuming `deletePlayer` is a service function
            // Call the onDelete function passed as a prop to update the parent component
            if (onDelete) {
                onDelete(id); // Pass the deleted player's id to the onDelete function
            }
        } catch (error) {
            console.error('Error deleting player:', error);
        }
    };

    return <button onClick={handleDelete}>Delete</button>; // Trigger handleDelete when button is clicked
};

export default DeletePlayer;