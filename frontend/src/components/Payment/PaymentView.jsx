import { BanknotesIcon } from '@heroicons/react/24/outline';
import Body from '@/components/Structure/Body';
import { HeaderWithIcon } from '@/components/Structure/Header';
import Footer from '@/components/Structure/Footer';
import PaymentReceiverCard from '@/components/Cards/PaymentReceiverCard';
import BillCard from '@/components/Cards/BillCard/BillCard';
import PaymentDetails from '@/components/Payment/PaymentDetails';
import QRPaymentDialog from '@/components/Payment/QRPaymentDialog';
import OrderSuccessDialog from '@/components/Payment/OrderSuccessDialog';
import { motion } from 'framer-motion';
import {
    containerVariants,
    itemVariants,
} from '@/lib/variants/payment.variant';
import { handlePrintInvoice } from '@/utils/payment/methods';
import { PAYMENT_CONSTANTS } from '@/constants/payment.constants';

export const PaymentView = ({
    products,
    loading,
    isAuthenticated,
    isQRDialogOpen,
    error,
    orderData,
    isOrderSuccessDialogOpen,
    selectedPaymentMethod,
    merchandiseSubtotal,
    isLoading,
    handlePaymentMethodChange,
    handleQRDialogClose,
    handleCheckout,
    setIsOrderSuccessDialogOpen,
}) => {
    if (loading || !isAuthenticated) {
        return null;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Body>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <HeaderWithIcon icon={BanknotesIcon} title="Payment" />
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants}>
                        <PaymentReceiverCard />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <PaymentDetails products={products} />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <BillCard
                            merchandiseSubtotal={merchandiseSubtotal}
                            shippingSubtotal={PAYMENT_CONSTANTS.SHIPPING_COST}
                            onPaymentMethodChange={handlePaymentMethodChange}
                            onCheckout={handleCheckout}
                            selectedPaymentMethod={selectedPaymentMethod}
                        />
                    </motion.div>
                </motion.div>

                <QRPaymentDialog
                    isOpen={isQRDialogOpen}
                    onOpenChange={handleQRDialogClose}
                    total={
                        merchandiseSubtotal + PAYMENT_CONSTANTS.SHIPPING_COST
                    }
                    bankInfo={PAYMENT_CONSTANTS.BANK_INFO}
                    error={error}
                    isLoading={isLoading}
                    onCheckout={handleCheckout}
                />

                <OrderSuccessDialog
                    isOpen={isOrderSuccessDialogOpen}
                    onOpenChange={setIsOrderSuccessDialogOpen}
                    orderData={orderData}
                    onPrint={handlePrintInvoice}
                    error={error}
                />
            </Body>
            <Footer />
        </div>
    );
};
