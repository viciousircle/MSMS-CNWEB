import React, { useEffect, useState } from "react";
import ProductCard from "@/components/Cards/ProductCard";
import { HeaderFullText } from "@/components/Header";
import Body from "@/components/Body";
import { GridCard } from "@/components/Decoration";
import img2 from "../assets/img2.jpeg";

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("mock/product.json")
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error loading mock data:", error));
    }, []);

    return (
        <Body>
            <HeaderFullText>
                Vicious Store.
                <span className="text-gray-500 ml-2">
                    Cách tốt nhất để mua sản phẩm bạn thích
                </span>
            </HeaderFullText>
            <GridCard>
                {products.map((product) => (
                    <div key={product.id}>
                        <ProductCard
                            img={product.img}
                            name={product.name}
                            price={product.price}
                        />
                    </div>
                ))}
            </GridCard>
        </Body>
    );
};

export default Home;
