import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import { useLogin } from '@/hooks/auth/useLogin.hook';

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

import LoginForm from '@/components/Others/LoginForm';

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
};

const LogIn = ({ className, ...props }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login, handleGoogleLogin, loading, error } = useLogin();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(formData);
    };

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <motion.div
                    className={cn('flex flex-col gap-6', className)}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    {...props}
                >
                    <Card>
                        <CardHeader>
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <CardTitle className="text-2xl">
                                    Login
                                </CardTitle>
                                <CardDescription>
                                    Enter your email below to login to your
                                    account
                                </CardDescription>
                            </motion.div>
                        </CardHeader>
                        <CardContent>
                            <LoginForm
                                formData={formData}
                                handleChange={handleChange}
                                loading={loading}
                                error={error}
                                onSubmit={handleSubmit}
                                handleGoogleSuccess={handleGoogleLogin}
                                handleGoogleError={() =>
                                    console.error('Google login failed')
                                }
                            />
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};

export default LogIn;
