import React from 'react';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const ColorSelector = React.memo(({ colors, selectedColor, onColorChange }) => {
    return (
        <div className="p-4 flex gap-4 items-center">
            <span className="block text-sm font-medium text-gray-700">
                Select Color:
            </span>
            <Select value={selectedColor} onValueChange={onColorChange}>
                <SelectTrigger className=" bg-gray-950/2.5 rounded-md flex justify-center px-4 py-1">
                    <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                    {colors.map(({ color, stock }) => (
                        <SelectItem
                            key={color}
                            value={color}
                            disabled={stock === 0}
                        >
                            <div className="flex items-center gap-2 text-sm">
                                <div
                                    className="w-4 h-4 rounded-full"
                                    style={{
                                        backgroundColor: color.toLowerCase(),
                                        border:
                                            color.toLowerCase() === 'white'
                                                ? '1px solid #ccc'
                                                : 'none',
                                    }}
                                ></div>
                                <span>
                                    {color}{' '}
                                    {stock === 0 ? '(Out of stock)' : ``}
                                </span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
});

export default ColorSelector;
