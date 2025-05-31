const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 80,
            damping: 20,
            mass: 1,
        },
    },
    exit: {
        opacity: 0,
        y: -30,
        scale: 0.98,
        transition: {
            duration: 0.25,
            ease: 'easeInOut',
        },
    },
};

export { containerVariants, itemVariants };
