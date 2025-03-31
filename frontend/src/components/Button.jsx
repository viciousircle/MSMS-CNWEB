import { Button } from "@/components/ui/button";
import { CircleCheck, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const CancelButton = () => (
    <DrawerClose asChild>
        <Button
            variant="outline"
            className="border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white"
        >
            Cancel
        </Button>
    </DrawerClose>
);

const ActionButtons = () => (
    <div className="flex w-full gap-2">
        <Button
            className="flex-1 hover:bg-emerald-600 hover:text-white bg-white border-emerald-600 border text-emerald-600"
            onClick={() =>
                toast(
                    <div className="flex items-center gap-2 text-green-600">
                        <CircleCheck />
                        <span>Item added to cart successfully!</span>
                    </div>
                )
            }
        >
            Add to Cart
        </Button>
        <Button className="flex-1">
            <Link to="/payment">Order now</Link>
        </Button>
    </div>
);

export { ActionButtons, CancelButton };
