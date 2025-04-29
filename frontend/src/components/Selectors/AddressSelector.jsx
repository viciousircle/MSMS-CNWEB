import React from 'react';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const AddressSelect = ({
    value,
    options,
    placeholder,
    onChange,
    disabled,
    className = 'w-full',
}) => (
    <Select value={value || ''} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger
            className={`border shadow-xs rounded-md text-sm whitespace-nowrap ${className}`}
        >
            <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="whitespace-nowrap">
            {options.map(({ code, name }) => (
                <SelectItem
                    key={code}
                    value={code.toString()}
                    className="whitespace-nowrap"
                >
                    {name}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
);

const AddressInput = ({ name, value, onChange, placeholder }) => (
    <Input
        placeholder={placeholder}
        className="w-full"
        name={name}
        value={value}
        onChange={onChange}
    />
);

export const AddressSelector = ({
    address: { provinceCode, districtCode, wardCode, number, street },
    provinces,
    districts,
    wards,
    onProvinceChange,
    onDistrictChange,
    onWardChange,
    onAddressChange,
}) => (
    <div className="gap-2 flex-1 flex">
        <AddressSelect
            value={provinceCode}
            options={provinces}
            placeholder="Tỉnh"
            onChange={onProvinceChange}
            className="w-[500px]"
        />
        <AddressSelect
            value={districtCode}
            options={districts}
            placeholder="Huyện"
            onChange={onDistrictChange}
            disabled={!provinceCode}
        />
        <AddressSelect
            value={wardCode}
            options={wards}
            placeholder="Phường"
            onChange={onWardChange}
            disabled={!districtCode}
        />
        <AddressInput
            name="number"
            value={number}
            onChange={onAddressChange}
            placeholder="Số nhà"
        />
        <AddressInput
            name="street"
            value={street}
            onChange={onAddressChange}
            placeholder="Phố"
        />
    </div>
);
