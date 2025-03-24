/**
 * @desc: Get all orders of one user
 * @route: GET /api/orders
 * @access: Private (only authenticated customer can access)
 */

/**
 * @desc: Get all orders of all users
 * @route: GET /api/seller/orders
 * @access: Private (only authenticated seller can access)
 */

/**
 * @desc: Add order
 * @route: POST /api/orders
 * @access: Private (only authenticated customer can access)
 */

/**
 * @desc: Update order status
 * @route: PUT /api/orders/:id
 * @access: Private (only authenticated seller can access)
 */

/**
 * @desc: Cancel order by customer
 * @route: DELETE /api/orders/:id
 * @access: Private (only authenticated customer can access)
 */

/**
 * @desc: Cancel order by seller
 * @route: DELETE /api/seller/orders/:id
 * @access: Private (only authenticated seller can access)
 */
