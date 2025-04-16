// ProductCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import OptionDrawer from '@/components/OptionDrawer';

const ProductCard = ({ product }) => {
    const { img, name, price, colors } = product;

    return (
        <div className="flex flex-col w-full gap-0">
            <Divider horizontal />
            <div className="flex w-full gap-0">
                <Divider vertical />
                <CardContent
                    img={img}
                    name={name}
                    price={price}
                    colors={colors}
                    product={product}
                />
                <Divider vertical />
            </div>
            <Divider horizontal />
        </div>
    );
};

const CardContent = ({ product }) => {
    const { img, name, price, colors } = product;
    return (
        <div className="flex flex-col border border-gray-950/5 p-2 w-full gap-4 hover:bg-gray-950/2.5 min-w-max">
            <ProductImage img={img} />
            <div className="pb-2 flex justify-between items-center">
                <ProductInfo name={name} price={price} />
                <OptionDrawer colors={colors} product={product} />
            </div>
        </div>
    );
};

const ProductImage = React.memo(({ img }) => (
    <figure className="flex bg-white h-64 justify-center rounded-lg w-full items-center outline outline-gray-950/5">
        <img src={img} alt="Product" className="w-64 h-64 object-contain" />
    </figure>
));
ProductImage.propTypes = {
    img: PropTypes.string.isRequired,
};

const ProductInfo = React.memo(({ name, price }) => (
    <div className="flex flex-col gap-2 items-start w-full max-w-[150px]">
        <span
            className="font-medium truncate w-full whitespace-nowrap overflow-hidden block text-left"
            title={name}
        >
            {name}
        </span>
        <span className="text-gray-400 text-sm font-mono">{price}</span>
    </div>
));
ProductInfo.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
};

const Divider = React.memo(({ horizontal }) =>
    horizontal ? (
        <div className="flex w-full gap-0">
            <Spacer />
            <div className="border-gray-950/5 border-x p-2 w-full"></div>
            <Spacer />
        </div>
    ) : (
        <div className="border-gray-950/5 border-y p-2"></div>
    )
);
Divider.propTypes = {
    horizontal: PropTypes.bool,
};

const Spacer = React.memo(() => <div className="p-2"></div>);

ProductCard.propTypes = {
    product: PropTypes.shape({
        img: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        colors: PropTypes.array.isRequired,
    }).isRequired,
};

export default ProductCard;
