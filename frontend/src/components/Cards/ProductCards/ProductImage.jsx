import React from 'react';
import PropTypes from 'prop-types';

const ProductImage = React.memo(
    ({
        src,
        alt = 'Product',
        dimmed = false,
        className = '',
        imgClassName = '',
    }) => (
        <figure
            className={`flex bg-white w-full items-center justify-center ${className}`}
        >
            <img
                src={src}
                alt={alt}
                className={`object-contain ${
                    dimmed ? 'opacity-70' : 'opacity-100'
                } ${imgClassName}`}
            />
        </figure>
    )
);

ProductImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    dimmed: PropTypes.bool,
    className: PropTypes.string,
    imgClassName: PropTypes.string,
};

export default ProductImage;
