function CheckBox({ title }) {
    return (
        <div className="relative">
            <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />
            <div className="text-gray-700 text-pretty font-medium font-mono px-4 tracking-widest uppercase flex gap-4">
                <div className="flex border-gray-950/5 border-x gap-2 hover:bg-gray-950/2.5 items-center px-4 py-2">
                    <div className="border p-2"></div>
                    <div className="">{title}</div>
                </div>
            </div>

            <hr className="border-gray-950/5 absolute bottom-0 left-[-100%] right-[-100%]" />
        </div>
    );
}

export default CheckBox;
