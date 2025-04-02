import React, { useEffect, useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Body from "@/components/Body";
import { HeaderWithIcon } from "@/components/Header";
import CheckBox from "@/components/Checkbox";
import { LinearCard } from "@/components/Decoration";
import { CartTotal } from "@/components/Footer";
import { CartInformation } from "@/components/Card";
import CartProductCard from "@/components/Cards/CartProductCard";

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [checkedProducts, setCheckedProducts] = useState({}); // Track checked state

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch("/mock/cart.json");
            const data = await response.json();
            setProducts(data);
            // Initialize checked state (false for all)
            const initialCheckedState = data.reduce((acc, product) => {
                acc[product.id] = false; // Assume each product has a unique `id`
                return acc;
            }, {});
            setCheckedProducts(initialCheckedState);
        };

        fetchProducts();
    }, []);

    // Handle the "Products" checkbox
    const handleProductsCheck = (isChecked) => {
        const newCheckedState = { ...checkedProducts };
        products.forEach((product) => {
            if (product.inStock > 0) {
                newCheckedState[product.id] = isChecked; // Only check if in stock
            }
        });
        setCheckedProducts(newCheckedState);
    };

    // Handle individual product checkbox changes
    const handleProductCheck = (productId, isChecked) => {
        setCheckedProducts((prevState) => ({
            ...prevState,
            [productId]: isChecked,
        }));
    };

    return (
        <>
            <Body>
                <HeaderWithIcon icon={ShoppingCartIcon} title="Cart" />

                {/* Pass checked state and handler to CheckBox */}
                <CheckBox
                    title="Products"
                    checked={Object.values(checkedProducts).every((v) => v)} // Check if all are checked
                    onChange={(e) => handleProductsCheck(e.target.checked)}
                />

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                        <CartInformation date={"12/12/2025"} items={"4"} />
                        <LinearCard>
                            {products.map((product) => (
                                <CartProductCard
                                    key={product.id}
                                    product={product}
                                    isChecked={
                                        checkedProducts[product.id] || false
                                    }
                                    onCheckChange={handleProductCheck}
                                />
                            ))}
                        </LinearCard>
                    </div>
                </div>
            </Body>
            <CartTotal />
        </>
    );
};

export default Cart;
