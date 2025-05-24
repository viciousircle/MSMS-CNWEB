import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { XCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const BuyButton = ({ products, className, onClick }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleClick = (e) => {
        if (onClick) {
            onClick(e);
            return;
        }

        if (!isAuthenticated()) {
            toast(
                <div className="flex items-center gap-2 text-yellow-600">
                    <XCircle />
                    <span>Please login to continue</span>
                </div>
            );
            navigate('/login');
            return;
        }

        // If no onClick handler provided, proceed with default navigation
        return true;
    };

    return (
        <Link
            to="/payment"
            state={{
                products: products,
            }}
            className={className}
            onClick={handleClick}
        >
            <div>Buy now</div>
        </Link>
    );
};

export default BuyButton;
