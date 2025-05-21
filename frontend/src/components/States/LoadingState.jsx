import React from 'react';
import Body from '@/components/Structure/Body';
import { HeaderWithIcon } from '@/components/Structure/Header';

const LoadingState = ({ icon: Icon, title }) => {
    return (
        <Body>
            {Icon && title && <HeaderWithIcon icon={Icon} title={title} />}
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        </Body>
    );
};

export default LoadingState;
