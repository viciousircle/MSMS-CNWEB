import { InboxArrowDownIcon } from '@heroicons/react/24/outline';
import Body from '@/components/Structure/Body';
import { HeaderWithIcon } from '@/components/Structure/Header';
import StatusSelector from '@/components/Selectors/StatusSelector';
import OrderItemAccordion from '@/components/Accordion/OrderItemAccordion/OrderItemAccordion';
import LoadingState from '@/components/States/LoadingState';
import ErrorState from '@/components/States/ErrorState';
import Footer from '@/components/Structure/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { containerVariants, itemVariants } from '@/lib/variants/order.variant';
import { EmptyOrderState } from '@/components/Order/EmptyOrderState';

export const OrderView = ({
    filteredOrders,
    loading,
    error,
    refetch,
    activeTab,
    setActiveTab,
}) => {
    if (loading) {
        return <LoadingState icon={InboxArrowDownIcon} title="My Orders" />;
    }

    if (error) {
        return (
            <ErrorState
                icon={InboxArrowDownIcon}
                title="My Orders"
                error={error}
                onRetry={refetch}
            />
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Body>
                <HeaderWithIcon icon={InboxArrowDownIcon} title="My Orders" />

                <div className="px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            type: 'spring',
                            stiffness: 100,
                            damping: 25,
                            mass: 1.2,
                            delay: 0.3,
                        }}
                        className="mb-6"
                    >
                        <StatusSelector
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                    </motion.div>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-4"
                    >
                        <AnimatePresence mode="wait">
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
                                    <motion.div
                                        key={order._id}
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        layout
                                    >
                                        <OrderItemAccordion
                                            order={order}
                                            refetchOrders={refetch}
                                        />
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <EmptyOrderState />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </Body>
            <Footer />
        </div>
    );
};
