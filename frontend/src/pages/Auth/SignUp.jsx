import React from 'react';
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
import { useSignUp } from '@/hooks/auth/useSignUp.hook';
import { Link } from 'react-router-dom';
import { Chrome } from 'lucide-react';
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

const formFields = [
    {
        id: 'name',
        label: 'Full Name',
        type: 'text',
        placeholder: 'Nguyen Van A',
    },
    {
        id: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'abc@example.com',
    },
    {
        id: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter password here',
    },
    {
        id: 'confirmPassword',
        label: 'Confirm Password',
        type: 'password',
        placeholder: 'Enter password again',
    },
];

const SignUp = ({ className, ...props }) => {
    const { formData, error, isSubmitting, handleChange, handleSubmit } =
        useSignUp();

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const response = await fetch(
                'https://msms-cnweb.onrender.com/api/users/google',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        credential: credentialResponse.credential,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Google authentication failed');
            }

            // Handle successful login (store token, redirect, etc.)
            console.log('Google login successful', data);
            // You might want to store the token and redirect user
            localStorage.setItem('token', data.token);
            window.location.href = '/'; // Redirect to home page
        } catch (error) {
            console.error('Google login error:', error);
            // Handle error (show error message to user)
        }
    };

    const handleGoogleError = () => {
        console.error('Google login failed');
        // Handle error (show error message to user)
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
                                <CardTitle className="text-2xl text-center">
                                    Sign Up
                                </CardTitle>
                                <CardDescription>
                                    Enter your information to create an account
                                </CardDescription>
                            </motion.div>
                        </CardHeader>
                        <CardContent>
                            <motion.form
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-4"
                                variants={formVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {formFields.map((field) => (
                                    <motion.div
                                        key={field.id}
                                        className="grid gap-2"
                                        variants={fieldVariants}
                                    >
                                        <Label htmlFor={field.id}>
                                            {field.label}
                                        </Label>
                                        <Input
                                            id={field.id}
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            required
                                            value={formData[field.id]}
                                            onChange={handleChange}
                                        />
                                    </motion.div>
                                ))}
                                {error && (
                                    <motion.p
                                        className="text-red-500 text-sm"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {error}
                                    </motion.p>
                                )}
                                <motion.div variants={fieldVariants}>
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting
                                            ? 'Signing Up...'
                                            : 'Sign Up'}
                                    </Button>
                                </motion.div>

                                <motion.div variants={fieldVariants}>
                                    <GoogleOAuthProvider clientId="307929468741-krtae45ju48n573oouj2ksg61pm2p8li.apps.googleusercontent.com">
                                        <div className="flex justify-center">
                                            <GoogleLogin
                                                onSuccess={handleGoogleSuccess}
                                                onError={handleGoogleError}
                                                useOneTap={false}
                                            />
                                        </div>
                                    </GoogleOAuthProvider>
                                </motion.div>

                                <motion.p
                                    className="text-sm text-center text-gray-400"
                                    variants={fieldVariants}
                                >
                                    Already have an account?{' '}
                                    <Link
                                        to="/login"
                                        className="text-gray-600 underline font-medium"
                                    >
                                        Log In
                                    </Link>
                                </motion.p>
                            </motion.form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};

export default SignUp;
