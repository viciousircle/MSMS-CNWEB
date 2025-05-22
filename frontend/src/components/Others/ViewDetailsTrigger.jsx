import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

const ViewDetailsTrigger = ({ loading }) => {
    if (loading) {
        return (
            <div>
                <Button variant="link" className="px-0 text-sm text-gray-300">
                    <span className="flex items-center gap-1">
                        View <ArrowUpRight className="h-4 w-4" />
                    </span>
                </Button>
            </div>
        );
    }

    return (
        <Button variant="link" className="px-0 text-sm">
            <span className="flex items-center gap-1">
                View <ArrowUpRight className="h-4 w-4" />
            </span>
        </Button>
    );
};

export default ViewDetailsTrigger;
