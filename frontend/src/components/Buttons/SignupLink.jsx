import React from 'react';

const SignupLink = () => {
    return (
        <div className="mt-4 text-center text-sm">
            Don't have an account?{' '}
            <a href="/signup" className="underline underline-offset-4">
                Sign up
            </a>
        </div>
    );
};

export default SignupLink;
