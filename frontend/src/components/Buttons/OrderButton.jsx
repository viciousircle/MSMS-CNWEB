import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const OrderButton = () => {
    return (
        <div className="flex-1">
            <Link to="/payment">
                <Button className={"w-full"}>Order now</Button>
            </Link>
        </div>
    );
};

export default OrderButton;
