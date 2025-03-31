import { ShoppingBagIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

function HeaderFullText({ children }) {
    return (
        <div className="text-center relative">
            <hr className="hr-top" />
            <h1 className="text-5xl max-w-none px-8 py-8 text-wrap ">
                {children}
            </h1>
            <hr className="hr-bot" />
        </div>
    );
}

function HeaderWithIcon({ icon: Icon, title }) {
    return (
        <div className="relative">
            <hr className="hr-top" />
            <h1 className="text-5xl text-pretty gap-x-2 flex max-w-none  tracking-widest whitespace-nowrap items-center">
                <div className="border-r border-gray-950/5 flex items-center">
                    {Icon && <Icon className="size-24 py-1 px-4" />}
                </div>
                <div className="px-2 font-serif">{title}</div>
            </h1>
            <hr className="hr-bot" />
        </div>
    );
}

export { HeaderFullText, HeaderWithIcon };
