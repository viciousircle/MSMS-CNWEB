import React from 'react';
import { cn } from '@/lib/utils';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useLogin } from '@/hooks/auth/useLogin.hook';
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
    const {
        formData,
        errors,
        loading,
        handleChange,
        handleBlur,
        login,
        handleGoogleLogin,
    } = useLogin();

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
                                <CardTitle className="text-2xl text-center">
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
                                errors={errors}
                                loading={loading}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                onSubmit={login}
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
