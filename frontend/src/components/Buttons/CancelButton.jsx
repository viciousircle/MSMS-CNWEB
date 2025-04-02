import { Button } from "@/components/ui/button";

const CancelButton = ({ onClose }) => (
    <Button
        variant="outline"
        className="border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white"
        onClick={onClose}
    >
        Cancel
    </Button>
);

export default CancelButton;
