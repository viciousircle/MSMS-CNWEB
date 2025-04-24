import React from 'react';
import PropTypes from 'prop-types';

const ProductImage = React.memo(
    ({ src, alt = 'Product', dimmed = false, className = '' }) => (
        <figure
            className={`flex bg-white h-64 justify-center rounded-lg w-full items-center outline outline-gray-950/5 ${className}`}
        >
            <img
                src={src}
                alt={alt}
                className={`object-contain  w-80 h-40 ${
                    dimmed ? 'opacity-70' : 'opacity-100'
                } ${className}`}
            />
        </figure>
    )
);

ProductImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    dimmed: PropTypes.bool,
    className: PropTypes.string,
};

export default ProductImage;
