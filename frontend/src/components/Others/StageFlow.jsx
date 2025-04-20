import React from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
const StageFlow = () => {
    return (
        <HoverCard>
            <HoverCardTrigger>
                <Button>
                    <InformationCircleIcon className="size-6 text-white" />
                </Button>
            </HoverCardTrigger>
            <HoverCardContent className={'flex w-full'}>
                <div className="flex items-start p-10 ">
                    <div className=" border border-gray-300 px-6 py-1 rounded text-sm h-full flex items-center justify-center ">
                        New
                    </div>

                    <div className="flex flex-col">
                        <div className="border-t border-gray-300 px-8 mt-4 rounded-full "></div>
                        <div className="border-t border-gray-300 px-8 mt-13  rounded-full"></div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="border border-gray-300 px-6 py-1 rounded text-sm h-full flex items-center justify-center ">
                            Prepare
                        </div>
                        <div className="border border-gray-300 px-6 py-1 rounded text-sm h-full flex items-center justify-center ">
                            Reject
                        </div>
                    </div>

                    <div className="border-t border-gray-300 px-8 mt-4 rounded-full "></div>

                    {/* Shipping */}
                    <div className="flex items-center">
                        <div className="border border-gray-300 px-6 py-1 rounded text-sm h-full flex items-center justify-center ">
                            Shipping
                        </div>
                    </div>

                    <div className="border-t border-gray-300 px-8 mt-4 rounded-full "></div>
                    <div className="flex items-center">
                        <div className="border border-gray-300 px-6 py-1 rounded text-sm h-full flex items-center justify-center ">
                            Shipped
                        </div>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
};

export default StageFlow;
