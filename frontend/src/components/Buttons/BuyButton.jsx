import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const BuyButton = ({ products, className }) => {
    return (
        <Link
            to="/payment"
            state={{
                products: products,
            }}
            className={className}
        >
            <div>Buy now</div>
        </Link>
    );
};

export default BuyButton;
