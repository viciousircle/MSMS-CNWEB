import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { motion, AnimatePresence } from 'framer-motion';
import SignupLink from '@/components/Buttons/SignupLink';

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

// Separate animation for error messages
const errorVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
        opacity: 1,
        height: 'auto',
        transition: {
            duration: 0.2,
        },
    },
    exit: {
        opacity: 0,
        height: 0,
        transition: {
            duration: 0.2,
        },
    },
};

const LoginForm = ({
    formData,
    errors,
    loading,
    handleChange,
    handleBlur,
    onSubmit,
    handleGoogleSuccess,
    handleGoogleError,
}) => {
    return (
        <motion.form
            onSubmit={onSubmit}
            variants={formVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
        >
            <motion.div className="grid gap-2" variants={fieldVariants}>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="abc@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={cn(
                        errors.email &&
                            'border-red-500 focus-visible:ring-red-500'
                    )}
                />
                <AnimatePresence>
                    {errors.email && (
                        <motion.p
                            key="email-error"
                            className="text-red-500 text-sm overflow-hidden"
                            variants={errorVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            {errors.email}
                        </motion.p>
                    )}
                </AnimatePresence>
            </motion.div>

            <motion.div className="grid gap-2" variants={fieldVariants}>
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={cn(
                        errors.password &&
                            'border-red-500 focus-visible:ring-red-500'
                    )}
                />
                <AnimatePresence>
                    {errors.password && (
                        <motion.p
                            key="password-error"
                            className="text-red-500 text-sm overflow-hidden"
                            variants={errorVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            {errors.password}
                        </motion.p>
                    )}
                </AnimatePresence>
            </motion.div>

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
                        />
                    </div>
                </GoogleOAuthProvider>
            </motion.div>

            <motion.div variants={fieldVariants}>
                <SignupLink />
            </motion.div>
        </motion.form>
    );
};

export default LoginForm;
