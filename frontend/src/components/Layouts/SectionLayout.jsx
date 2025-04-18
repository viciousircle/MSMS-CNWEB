import React from 'react';

const Section = ({ children }) => {
    return (
        <div className="relative my-4">
            <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />
            <div className="flex items-center gap-4 px-4 ">
                <div className="text-gray-700 text-pretty font-medium font-mono tracking-widest uppercase flex gap-4">
                    {children}
                </div>
            </div>
            <hr className="border-gray-950/5 absolute bottom-0 left-[-100%] right-[-100%]" />
        </div>
    );
};

const SectionItem = ({ children, className = '', onClick }) => {
    return (
        <div
            className={`flex border-gray-950/5 border-x items-center px-4 py-2 gap-2 w-full ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export { Section, SectionItem };
