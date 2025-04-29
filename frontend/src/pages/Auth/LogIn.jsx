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
import { useLogin } from '@/hooks/useLogin.hook';

const LoginForm = ({ formData, handleChange, loading, error, onSubmit }) => (
    <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-6">
            <FormField
                id="email"
                label="Email"
                type="email"
                placeholder="abc@example.com"
                value={formData.email}
                onChange={handleChange}
                required
            />

            <FormField
                id="password"
                label="Password"
                type="password"
                placeholder="Enter password here"
                value={formData.password}
                onChange={handleChange}
                required
            />

            {error && <ErrorMessage message={error} />}

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </Button>

            <Button variant="outline" className="w-full" type="button">
                Login with Google
            </Button>

            <SignupLink />
        </div>
    </form>
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
        Don&apos;t have an account?{' '}
        <a href="/signup" className="underline underline-offset-4">
            Sign up
        </a>
    </div>
);

const LogIn = ({ className, ...props }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login, loading, error } = useLogin();

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
                <div
                    className={cn('flex flex-col gap-6', className)}
                    {...props}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Login</CardTitle>
                            <CardDescription>
                                Enter your email below to login to your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <LoginForm
                                formData={formData}
                                handleChange={handleChange}
                                loading={loading}
                                error={error}
                                onSubmit={handleSubmit}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default LogIn;
