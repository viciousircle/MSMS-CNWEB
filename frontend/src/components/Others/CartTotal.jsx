import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '/utils/currency';

const CartTotal = ({ products, checkedProducts }) => {
    const total = products.reduce((sum, product) => {
        // Only add to total if product is checked
        if (checkedProducts[product._id]) {
            return sum + product.price * product.quantity;
        }
        return sum;
    }, 0);

    const formattedTotal = formatCurrency(total);

    return (
        <div className="fixed bottom-0 left-0 w-full border-t border-gray-950/5 bg-white bg-[image:repeating-linear-gradient(45deg,currentColor_0,currentColor_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed text-gray-950/5 flex justify-center">
            <div className="flex justify-center bg-white w-fit border-x">
                <div className="font-medium text-black py-4 px-8 bg-gray-950/5">
                    Total: {formattedTotal}
                </div>
                <div className="bg-white text-black border-l border-gray-950/5 cursor-pointer px-16 uppercase tracking-widest font-medium flex items-center justify-center hover:bg-black hover:text-gray-200 transition duration-300">
                    <Link to="/payment">Buy now</Link>
                </div>
            </div>
        </div>
    );
};
export default CartTotal;
