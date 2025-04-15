import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const SkeletonProductCard = () => {
    return (
        <div className="p-4 rounded-lg border shadow-sm space-y-3">
            <Skeleton className="w-full h-40 rounded-lg" />
            <Skeleton className="w-3/4 h-5" />
            <Skeleton className="w-1/2 h-5" />
            <Skeleton className="w-1/2 h-5" />
        </div>
    );
};

export default SkeletonProductCard;
