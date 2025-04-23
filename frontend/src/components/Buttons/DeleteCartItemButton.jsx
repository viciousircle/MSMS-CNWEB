import React from 'react';
import { deleteCartItem } from '/utils/api';

const DeleteCartItemButton = ({ id, onDelete }) => {
    const handleDelete = async () => {
        try {
            await deleteCartItem(id);
            if (onDelete) {
                onDelete(id);
            }
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
