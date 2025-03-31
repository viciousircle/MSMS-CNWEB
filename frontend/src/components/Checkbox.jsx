import { useState } from "react";
import { Check } from "lucide-react";

function CheckBox({ title }) {
    const [checked, setChecked] = useState(false);

    return (
        <div className="relative">
            <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />

            {/* Add bg-gray-950/2.5 when checked */}
            <div
                className={
                    "text-gray-700 text-pretty font-medium font-mono px-4 tracking-widest uppercase flex gap-4 transition-all "
                }
            >
                <label
                    className={`flex border-gray-950/5 border-x gap-2 items-center px-4 py-2 cursor-pointer hover:bg-gray-950/2.5  ${
                        checked ? "bg-gray-950/2.5" : ""
                    } `}
                >
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => setChecked(!checked)}
                        className="hidden"
                    />

                    <div className="border p-1 w-6 h-6 flex items-center justify-center rounded bg-white">
                        {checked && (
                            <Check size={24} className="text-gray-700" />
                        )}
                    </div>

                    <span>{title}</span>
                </label>
            </div>

            <hr className="border-gray-950/5 absolute bottom-0 left-[-100%] right-[-100%]" />
        </div>
    );
}

export default CheckBox;
