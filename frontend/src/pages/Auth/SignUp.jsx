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
                'http://localhost:5678/api/users/google',
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
                <div
                    className={cn('flex flex-col gap-6', className)}
                    {...props}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl text-center">
                                Sign Up
                            </CardTitle>
                            <CardDescription>
                                Enter your information to create an account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-4"
                            >
                                {formFields.map((field) => (
                                    <div key={field.id} className="grid gap-2">
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
                                    </div>
                                ))}
                                {error && (
                                    <p className="text-red-500 text-sm">
                                        {error}
                                    </p>
                                )}
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                                </Button>

                                <GoogleOAuthProvider clientId="307929468741-krtae45ju48n573oouj2ksg61pm2p8li.apps.googleusercontent.com">
                                    <div className="flex justify-center">
                                        <GoogleLogin
                                            onSuccess={handleGoogleSuccess}
                                            onError={handleGoogleError}
                                            useOneTap={false}
                                        />
                                    </div>
                                </GoogleOAuthProvider>

                                <p className="text-sm text-center text-gray-400">
                                    Already have an account?{' '}
                                    <Link
                                        to="/login"
                                        className="text-gray-600 underline font-medium"
                                    >
                                        Log In
                                    </Link>
                                </p>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
