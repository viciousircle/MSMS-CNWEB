import React from 'react';
import OptionDrawer from '../Others/OptionDrawer';
import ProductCard from './ProductCards/ProductCard';
import ProductImage from './ProductCards/ProductImage';
import ProductInfo from './ProductCards/ProductInfo';
const StandardProductCard = ({ product }) => {
    const { img, name, price, colors } = product;

    return (
        <ProductCard>
            <div className="flex flex-col border border-gray-950/5 p-2 w-full gap-4 hover:bg-gray-950/2.5 min-w-max">
                <ProductImage
                    src={img}
                    className=" w-full h-56"
                    imgClassName="w-64 h-64 object-contain"
                />
                <div className="pb-2 flex justify-between items-center">
                    <ProductInfo
                        name={name}
                        price={price}
                        className="w-full max-w-[150px]"
                    />
                    <OptionDrawer colors={colors} product={product} />
                </div>
            </div>
        </ProductCard>
    );
};
export default StandardProductCard;
