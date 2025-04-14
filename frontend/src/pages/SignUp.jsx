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

const SignUp = (className, ...props) => {
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
                            <form>
                                <div className="flex flex-col gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="abc@example.com"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">
                                                Password
                                            </Label>
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Enter password here"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">
                                                Confirm Password
                                            </Label>
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Enter password here"
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Sign Up
                                    </Button>
                                    {/* <Button
                                        variant="outline"
                                        className="w-full"
                                    >
                                        Sign Up with Google
                                    </Button> */}
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
