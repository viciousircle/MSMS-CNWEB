import React from "react";
import { ProductCard } from "../components/Card";
import { HeaderFullText } from "@/components/Header";
import Body from "@/components/Body";
import { GridCard } from "@/components/Decoration";
import img2 from "../assets/img2.jpeg";

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
                        <ProductCard
                            img={img2}
                            name={"MacBook Pro"}
                            price={"39.000.000"}
                        />
                    </div>
                ))}
            </GridCard>
        </Body>
    );
};

export default Home;
