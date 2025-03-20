import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import {
    ChevronDownIcon,
    PhoneIcon,
    PlayCircleIcon,
} from "@heroicons/react/20/solid";
import {
    ArrowPathIcon,
    ArrowTopRightOnSquareIcon,
    ChartPieIcon,
    ComputerDesktopIcon,
    CubeTransparentIcon,
    CursorArrowRaysIcon,
    DevicePhoneMobileIcon,
    DeviceTabletIcon,
    FingerPrintIcon,
    GifIcon,
    GiftIcon,
    RectangleGroupIcon,
    SquaresPlusIcon,
} from "@heroicons/react/24/outline";

const solutions = [
    {
        name: "All",
        description: "All products in one place",
        href: "#",
        icon: RectangleGroupIcon,
    },
    {
        name: "Sales",
        description: "Sales up to 50% off",
        href: "#",
        icon: GiftIcon,
    },
    {
        name: "Mac",
        description: "Exclusive sales and discounts",
        href: "#",
        icon: ComputerDesktopIcon,
    },
    {
        name: "Ipad",
        description: "Smooth experience with large screen",
        href: "#",
        icon: DeviceTabletIcon,
    },
    {
        name: "Iphone",
        description: "Modern design and high performance",
        href: "#",
        icon: DevicePhoneMobileIcon,
    },
    {
        name: "Accessory",
        description: "High quality accessories",
        href: "#",
        icon: CubeTransparentIcon,
    },
];
const callsToAction = [
    { name: "Facebook", href: "#", icon: ArrowTopRightOnSquareIcon },
    { name: "Contact", href: "#", icon: PhoneIcon },
];

export default function FlyoutMenus() {
    return (
        <Popover className="relative">
            <PopoverButton className="text-gray-900 text-sm/6 focus:outline-none font-semibold gap-x-1 inline-flex items-center">
                <span>Store</span>
                <ChevronDownIcon aria-hidden="true" className="size-5" />
            </PopoverButton>

            <PopoverPanel
                transition
                className="flex w-screen -translate-x-1/2 absolute data-closed:opacity-0 data-closed:translate-y-1 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in left-1/2 max-w-max mt-5 px-4 transition z-10"
            >
                <div className="flex-auto bg-white rounded-3xl shadow-lg text-sm/6 w-screen max-w-md overflow-hidden ring-1 ring-gray-900/5">
                    <div className="p-4">
                        {solutions.map((item) => (
                            <div
                                key={item.name}
                                className="flex p-4 rounded-lg gap-x-6 group hover:bg-gray-50 relative"
                            >
                                <div className="flex flex-none bg-gray-50 justify-center rounded-lg group-hover:bg-white items-center mt-1 size-11">
                                    <item.icon
                                        aria-hidden="true"
                                        className="text-gray-600 group-hover:text-indigo-600 size-6"
                                    />
                                </div>
                                <div>
                                    <a
                                        href={item.href}
                                        className="text-gray-900 font-semibold"
                                    >
                                        {item.name}
                                        <span className="absolute inset-0" />
                                    </a>
                                    <p className="text-gray-600 mt-1">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 bg-gray-50 divide-gray-900/5 divide-x">
                        {callsToAction.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="flex justify-center p-3 text-gray-900 font-semibold gap-x-2.5 hover:bg-gray-100 items-center"
                            >
                                <item.icon
                                    aria-hidden="true"
                                    className="flex-none text-gray-400 size-5"
                                />
                                {item.name}
                            </a>
                        ))}
                    </div>
                </div>
            </PopoverPanel>
        </Popover>
    );
}
