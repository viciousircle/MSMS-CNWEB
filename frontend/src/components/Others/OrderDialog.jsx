import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const OrderDialog = () => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className="bg-black text-white px-16 py-2 shadow-inner hover:text-black hover:bg-gray-950/5 transition duration-300 cursor-pointer tracking-widest font-medium font-serif ">
                    Order Now
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle
                        className={
                            'text-center text-lg font-medium text-green-600'
                        }
                    >
                        Congratulations! Your order has been placed.
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        <img
                            src="https://media.tenor.com/gHygBs_JkKwAAAAi/moving-boxes.gif"
                            alt="Order Success"
                            className="w-1/2 mx-auto my-4"
                        />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Back to store</AlertDialogCancel>
                    <AlertDialogAction>Order status</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default OrderDialog;
