import React from "react";
import { CardProduct } from "../components/Card";
import { HeaderFullText } from "@/components/Header";
import Body from "@/components/Body";
import { GridCard } from "@/components/Card";

const Home = () => {
    return (
        <Body>
            <HeaderFullText>
                Vicious Store.
                <span className="text-gray-500 ml-2">
                    Cách tốt nhất để mua sản phẩm bạn thích
                </span>
            </HeaderFullText>
            <GridCard>
                {[...Array(8)].map((_, index) => (
                    <div key={index}>
                        <CardProduct />
                    </div>
                ))}
            </GridCard>
        </Body>
    );
};

export default Home;
