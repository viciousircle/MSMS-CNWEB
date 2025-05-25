import React from 'react';
import { format } from 'date-fns';

const DatePicker = ({ selectedDate, onDateChange }) => {
    const handleDateChange = (e) => {
        const date = e.target.value ? new Date(e.target.value) : null;
        onDateChange(date);
    };

    return (
        <div className="relative">
            <input
                type="date"
                value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}
                onChange={handleDateChange}
                className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Pick a date"
            />
        </div>
    );
};

export default DatePicker;
