import React from 'react';
import { Button } from '@/components/ui/button';

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import SignupLink from '@/components/Buttons/SignupLink';
import FormField from '@/components/Others/FormField';

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

const ErrorMessage = ({ message }) => (
    <p className="text-red-500 text-sm">{message}</p>
);

export default LoginForm;
