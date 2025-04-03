import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BuyButton = () => {
    return (
        <div className="flex-1">
            <Link to="/payment">
                <Button className={"w-full"}>Buy</Button>
            </Link>
        </div>
    );
};

export default BuyButton;
