import React from 'react';
import PropTypes from 'prop-types';

const ProductCard = ({
    children,
    withDividers = true,
    contentClassName = '',
    ...props
}) => {
    return (
        <div className="flex flex-col w-full">
            {/* {withDividers && <Divider horizontal />} */}
            <div className="flex w-full">
                {/* {withDividers && <Divider vertical />} */}
                <div className={`flex w-full ${contentClassName}`} {...props}>
                    {children}
                </div>
                {/* {withDividers && <Divider vertical />} */}
            </div>
            {/* {withDividers && <Divider horizontal />} */}
        </div>
    );
};

const Divider = React.memo(({ horizontal }) =>
    horizontal ? (
        <div className="flex w-full">
            <div className="p-2" />
            <div className="border-gray-950/5 border-x p-2 w-full" />
            <div className="p-2" />
        </div>
    ) : (
        <div className="border-gray-950/5 border-y p-2" />
    )
);

Divider.propTypes = {
    horizontal: PropTypes.bool,
};

ProductCard.propTypes = {
    children: PropTypes.node.isRequired,
    withDividers: PropTypes.bool,
    contentClassName: PropTypes.string,
};

export default ProductCard;
