import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

const ViewDetailsTrigger = ({ loading }) => {
    if (loading) {
        return (
            <div>
                <Button
                    variant="link"
                    className="w-full block text-center py-2 text-base md:w-auto md:inline md:px-0 md:text-sm text-gray-300"
                >
                    <span className="flex items-center gap-1 justify-center">
                        View <ArrowUpRight className="h-4 w-4" />
                    </span>
                </Button>
            </div>
        );
    }

    return (
        <Button
            variant="link"
            className="w-full block text-center py-2 text-base md:w-auto md:inline md:px-0 md:text-sm"
        >
            <span className="flex items-center gap-1 justify-center">
                View <ArrowUpRight className="h-4 w-4" />
            </span>
        </Button>
    );
};

export default ViewDetailsTrigger;
