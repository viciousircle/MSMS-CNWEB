import React from 'react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { ChevronDownIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';

const ProfileDropdown = ({
    user,
    profileDropdownItems,
    defaultProfileDropdownItems,
}) => {
    return (
        <Popover className="relative">
            <PopoverButton className="flex gap-4 items-center border-x py-2 px-6 border-gray-950/5 uppercase tracking-wider hover:bg-gray-950/5">
                <UserCircleIcon className="size-6" />
                {user?.name || 'Profile'}
                <ChevronDownIcon className="h-4 w-4" />
            </PopoverButton>
            <PopoverPanel className="absolute z-10 mt-2 bg-white shadow-lg rounded-md border border-gray-200 w-48">
                <div className="p-1">
                    {[...profileDropdownItems, ...defaultProfileDropdownItems]}
                </div>
            </PopoverPanel>
        </Popover>
    );
};

export default ProfileDropdown;
