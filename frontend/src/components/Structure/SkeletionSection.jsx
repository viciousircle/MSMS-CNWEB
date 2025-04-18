import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
const SkeletionSection = () => {
    return (
        <div className="p-24">
            <div className="space-y-2 py-3">
                <Skeleton className="h-8 " />
                <Skeleton className="h-8 " />
            </div>
            <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px]  rounded-xl" />
                <Skeleton className="h-[125px]  rounded-xl" />
                <Skeleton className="h-[125px]  rounded-xl" />
            </div>
        </div>
    );
};

export default SkeletionSection;
