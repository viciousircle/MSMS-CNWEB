import React from 'react';

import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ChangeStageMenu = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button>
                    <ArrowPathRoundedSquareIcon className="w-4 h-4 mr-1" />
                    Change Stage
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Next Stage</DropdownMenuItem>
                <DropdownMenuSeparator />
                {['Prepare', 'Shipping', 'Shipped', 'Reject'].map((stage) => (
                    <DropdownMenuItem key={stage}>{stage}</DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem>Previous Stage</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ChangeStageMenu;
