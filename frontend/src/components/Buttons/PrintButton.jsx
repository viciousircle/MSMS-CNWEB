import React from 'react';
import { PrinterIcon } from '@heroicons/react/24/outline';

import { Button } from '@/components/ui/button';

const PrintButton = () => {
    return (
        <Button variant="destructive">
            <PrinterIcon className="w-4 h-4" />
            Print Label
        </Button>
    );
};

export default PrintButton;
