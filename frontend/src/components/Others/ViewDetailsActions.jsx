import React from 'react';
import { Button } from '@/components/ui/button';
import { ORDER_CONSTANTS } from '@/constants/order.constants';

const ViewDetailsActions = ({
    orderStage,
    isUpdating,
    handleStageUpdate,
    paymentStatus,
    isPaymentUpdating,
    handlePaymentUpdate,
}) => {
    const isCancelledOrRejected =
        orderStage === ORDER_CONSTANTS.STAGES.CANCELLED ||
        orderStage === ORDER_CONSTANTS.STAGES.REJECT;

    return (
        <div className="space-y-3 w-full">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                {orderStage === ORDER_CONSTANTS.STAGES.NEW && (
                    <>
                        <Button
                            className="flex-1 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 text-sm sm:text-base py-2 sm:py-2.5"
                            onClick={() =>
                                handleStageUpdate(
                                    ORDER_CONSTANTS.STAGES.PREPARE
                                )
                            }
                            disabled={isUpdating}
                        >
                            {isUpdating ? 'Processing...' : 'Prepare'}
                        </Button>
                        <Button
                            className="flex-1 bg-red-100 text-red-700 hover:bg-red-200 text-sm sm:text-base py-2 sm:py-2.5"
                            onClick={() =>
                                handleStageUpdate(ORDER_CONSTANTS.STAGES.REJECT)
                            }
                            disabled={
                                isUpdating ||
                                paymentStatus ===
                                    ORDER_CONSTANTS.PAYMENT_STATUS.PAID
                            }
                        >
                            <span className="flex flex-col sm:flex-row items-center gap-1">
                                {isUpdating ? 'Processing...' : 'Reject'}
                                {paymentStatus ===
                                    ORDER_CONSTANTS.PAYMENT_STATUS.PAID && (
                                    <span className="text-xs whitespace-nowrap">
                                        (Cannot reject paid orders)
                                    </span>
                                )}
                            </span>
                        </Button>
                    </>
                )}
                {orderStage === ORDER_CONSTANTS.STAGES.PREPARE && (
                    <>
                        <Button
                            className="flex-1 bg-blue-100 text-blue-800 hover:bg-blue-200 text-sm sm:text-base py-2 sm:py-2.5"
                            onClick={() =>
                                handleStageUpdate(ORDER_CONSTANTS.STAGES.NEW)
                            }
                            disabled={isUpdating}
                        >
                            {isUpdating ? 'Processing...' : 'Revert to New'}
                        </Button>
                        <Button
                            className="flex-1 bg-green-100 text-green-800 hover:bg-green-200 text-sm sm:text-base py-2 sm:py-2.5"
                            onClick={() =>
                                handleStageUpdate(
                                    ORDER_CONSTANTS.STAGES.SHIPPING
                                )
                            }
                            disabled={isUpdating}
                        >
                            {isUpdating ? 'Processing...' : 'Mark as Shipping'}
                        </Button>
                    </>
                )}
                {orderStage === ORDER_CONSTANTS.STAGES.SHIPPING && (
                    <>
                        <Button
                            className="flex-1 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 text-sm sm:text-base py-2 sm:py-2.5"
                            onClick={() =>
                                handleStageUpdate(
                                    ORDER_CONSTANTS.STAGES.PREPARE
                                )
                            }
                            disabled={isUpdating}
                        >
                            {isUpdating ? 'Processing...' : 'Revert to Prepare'}
                        </Button>
                        <Button
                            className="flex-1 bg-purple-100 text-purple-800 hover:bg-purple-200 text-sm sm:text-base py-2 sm:py-2.5"
                            onClick={() =>
                                handleStageUpdate(
                                    ORDER_CONSTANTS.STAGES.SHIPPED
                                )
                            }
                            disabled={isUpdating}
                        >
                            {isUpdating ? 'Processing...' : 'Mark as Shipped'}
                        </Button>
                    </>
                )}
            </div>

            {!isCancelledOrRejected &&
                paymentStatus === ORDER_CONSTANTS.PAYMENT_STATUS.UNPAID && (
                    <Button
                        className="w-full bg-green-100 text-green-800 hover:bg-green-200 text-sm sm:text-base py-2 sm:py-2.5"
                        onClick={() => handlePaymentUpdate(true)}
                        disabled={isPaymentUpdating}
                    >
                        {isPaymentUpdating ? 'Processing...' : 'Mark as Paid'}
                    </Button>
                )}
        </div>
    );
};

export default ViewDetailsActions;
