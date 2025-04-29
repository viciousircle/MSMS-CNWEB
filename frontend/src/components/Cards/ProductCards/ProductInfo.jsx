import React from 'react';
import PropTypes from 'prop-types';

const ProductInfo = React.memo(
    ({
        name,
        price,
        color,
        stock,
        className = '',
        nameClassName = '',
        priceClassName = '',
        colorClassName = '',
        stockClassName = '',
    }) => (
        <div className={`flex flex-col gap-2 items-start w-full ${className}`}>
            <span
                className={`font-medium truncate w-full whitespace-nowrap overflow-hidden block text-left ${nameClassName}`}
                title={name}
            >
                {name}
            </span>
            {price && (
                <span
                    className={`text-gray-400 text-sm font-mono ${priceClassName}`}
                >
                    {price}
                </span>
            )}
            {color && (
                <div className={`flex gap-2 items-center ${colorClassName}`}>
                    <span>Color:</span>
                    <span>{color}</span>
                </div>
            )}
            {stock !== undefined && (
                <span className={`text-gray-500 ${stockClassName}`}>
                    {stock > 0 ? `Available: ${stock}` : 'Out of stock'}
                </span>
            )}
        </div>
    )
);

ProductInfo.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.string,
    color: PropTypes.string,
    stock: PropTypes.number,
    dimmed: PropTypes.bool,
    className: PropTypes.string,
    nameClassName: PropTypes.string,
    priceClassName: PropTypes.string,
    colorClassName: PropTypes.string,
    stockClassName: PropTypes.string,
};

export default ProductInfo;
