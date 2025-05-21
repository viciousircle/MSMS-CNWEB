import React from 'react';
import Body from '@/components/Structure/Body';
import { HeaderWithIcon } from '@/components/Structure/Header';

const ErrorState = ({ icon: Icon, title, error, onRetry }) => {
    return (
        <Body>
            {Icon && title && <HeaderWithIcon icon={Icon} title={title} />}
            <div className="p-4 text-center">
                <p className="text-red-500 mb-2 bg-red-100 flex items-center justify-center px-4 py-2 rounded-lg w-fit text-center">
                    Error: {error}
                </p>
                <button
                    className="text-blue-500 bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-lg"
                    onClick={onRetry || (() => window.location.reload())}
                >
                    Try Again
                </button>
            </div>
        </Body>
    );
};

export default ErrorState;
