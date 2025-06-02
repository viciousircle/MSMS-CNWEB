import React from 'react';
import OptionDrawer from '../Others/OptionDrawer';
import ProductCard from './ProductCards/ProductCard';
import ProductImage from './ProductCards/ProductImage';
import ProductInfo from './ProductCards/ProductInfo';

const StandardProductCard = ({ product }) => {
    const { img, name, price, colors } = product;

    return (
        <ProductCard>
            <div className="group relative flex flex-col w-full bg-white border border-gray-100 hover:border-gray-200 transition-all duration-200">
                <div className="relative overflow-hidden">
                    <ProductImage
                        src={img}
                        className="w-full aspect-square transition-transform duration-300 group-hover:scale-105"
                        imgClassName="w-full h-full object-contain p-4"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-200" />
                </div>
                <div className="flex flex-col p-4 gap-3 border-t border-gray-100">
                    <ProductInfo
                        name={name}
                        price={price}
                        className="w-full"
                        nameClassName="text-base font-medium text-gray-900 line-clamp-2"
                        priceClassName="text-sm font-medium text-gray-500"
                    />
                    <div className="flex justify-between items-center">
                        <div className="flex gap-1">
                            {colors.map(({ color, stock }) => (
                                <div
                                    key={color}
                                    className={`w-3 h-3 border ${
                                        stock > 0
                                            ? 'border-gray-200'
                                            : 'border-gray-100 opacity-50'
                                    }`}
                                    style={{
                                        backgroundColor: color.toLowerCase(),
                                    }}
                                />
                            ))}
                        </div>
                        <OptionDrawer colors={colors} product={product} />
                    </div>
                </div>
            </div>
        </ProductCard>
    );
};

export default StandardProductCard;
