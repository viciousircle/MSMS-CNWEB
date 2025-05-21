import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { CircleCheck, AlertTriangle, XCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useAddToCart } from '@/hooks/cart/useAddToCart.hook';

const COOLDOWN_DURATION = 1000;

const AddToCartButton = ({ onClose, product, selectedColor, quantity }) => {
    const [lastClickTime, setLastClickTime] = useState(0);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const { addToCart, isLoading } = useAddToCart();

    const showToast = (message, icon, colorClass) => {
        toast(
            <div className={`flex items-center gap-2 ${colorClass}`}>
                {icon}
                <span>{message}</span>
            </div>
        );
    };

    const validateSelection = () => {
        const colorVariant = product.colors.find(
            (c) => c.color === selectedColor
        );

        if (!colorVariant) {
            showToast(
                'Selected color variant not found',
                <XCircle />,
                'text-red-600'
            );
            return false;
        }

        if (colorVariant.stock < quantity) {
            showToast(
                `Insufficient stock! Only ${colorVariant.stock} items available.`,
                <XCircle />,
                'text-red-600'
            );
            return false;
        }

        return true;
    };

    const handleClick = async () => {
        if (!isAuthenticated()) {
            showToast(
                'Please login to add items to cart',
                <AlertTriangle />,
                'text-yellow-600'
            );
            navigate('/login');
            return;
        }

        const now = Date.now();
        if (now - lastClickTime < COOLDOWN_DURATION) {
            showToast(
                "You're clicking too fast! Please wait.",
                <AlertTriangle />,
                'text-yellow-600'
            );
            return;
        }

        setLastClickTime(now);

        if (!validateSelection()) return;

        try {
            await addToCart(product._id, selectedColor, quantity);
            showToast(
                'Item added to cart successfully!',
                <CircleCheck />,
                'text-green-600'
            );
            onClose();
        } catch (error) {
            showToast(
                error.message || 'Failed to add item.',
                <XCircle />,
                'text-red-600'
            );
        }
    };

    return (
        <Button
            className="flex-1 hover:bg-emerald-600 hover:text-white bg-white border-emerald-600 border text-emerald-600"
            onClick={handleClick}
            disabled={isLoading}
        >
            {isLoading ? 'Adding...' : 'Add to Cart'}
        </Button>
    );
};

export default AddToCartButton;
