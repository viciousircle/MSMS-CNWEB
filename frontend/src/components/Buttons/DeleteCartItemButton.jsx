import React from 'react';

const DeleteCartItemButton = ({ id, onDelete }) => {
    const handleDelete = async () => {
        try {
            await onDelete(id);
        } catch (error) {
            console.error('Failed to delete item:', error);
        }
    };

    return (
        <button
            className="text-red-500 hover:underline cursor-pointer"
            onClick={handleDelete}
        >
            Delete
        </button>
    );
};

export default DeleteCartItemButton;
