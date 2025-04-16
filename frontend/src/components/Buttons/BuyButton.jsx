import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const BuyButton = ({ product, selectedColor, quantity }) => {
    return (
        <div className="flex-1">
            <Link
                to="/payment"
                state={{
                    products: [
                        {
                            id: product._id,
                            name: product.name,
                            img: product.image,
                            color: selectedColor,
                            quantity: quantity,
                            price: product.price,
                        },
                    ],
                }}
            >
                <Button className={'w-full'}>Buy</Button>
            </Link>
        </div>
    );
};

export default BuyButton;
