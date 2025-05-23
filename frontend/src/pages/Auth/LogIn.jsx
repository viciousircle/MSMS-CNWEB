import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLogin } from '@/hooks/auth/useLogin.hook';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

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

const formVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
        },
    },
};

const LoginForm = ({
    formData,
    handleChange,
    loading,
    error,
    onSubmit,
    handleGoogleSuccess,
    handleGoogleError,
}) => (
    <motion.form
        onSubmit={onSubmit}
        variants={formVariants}
        initial="hidden"
        animate="visible"
    >
        <div className="flex flex-col gap-6">
            <motion.div variants={fieldVariants}>
                <FormField
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="abc@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </motion.div>

            <motion.div variants={fieldVariants}>
                <FormField
                    id="password"
                    label="Password"
                    type="password"
                    placeholder="Enter password here"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </motion.div>

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ErrorMessage message={error} />
                </motion.div>
            )}

            <motion.div variants={fieldVariants}>
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
            </motion.div>

            <motion.div variants={fieldVariants}>
                <GoogleOAuthProvider clientId="307929468741-krtae45ju48n573oouj2ksg61pm2p8li.apps.googleusercontent.com">
                    <div className="flex justify-center">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleError}
                            useOneTap={false}
                            width={330}
                            theme="neutral"
                            shape="square"
                            text="continue_with"
                        />
                    </div>
                </GoogleOAuthProvider>
            </motion.div>

            <motion.div variants={fieldVariants}>
                <SignupLink />
            </motion.div>
        </div>
    </motion.form>
);

const FormField = ({
    id,
    label,
    type,
    value,
    onChange,
    placeholder,
    required,
    extraLabel,
}) => (
    <div className="grid gap-2">
        <div className="flex items-center">
            <Label htmlFor={id}>{label}</Label>
            {extraLabel}
        </div>
        <Input
            id={id}
            type={type}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={onChange}
        />
    </div>
);

const ErrorMessage = ({ message }) => (
    <p className="text-red-500 text-sm">{message}</p>
);

const SignupLink = () => (
    <div className="mt-4 text-center text-sm">
        Don't have an account?{' '}
        <a href="/signup" className="underline underline-offset-4">
            Sign up
        </a>
    </div>
);

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
