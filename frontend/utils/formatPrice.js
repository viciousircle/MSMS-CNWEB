/**
 * Formats a number as a price with thousand separators
 * @param {number|string} price - The price to format
 * @param {string} [separator='.'] - The thousand separator
 * @returns {string} Formatted price string
 */
export const formatPrice = (price, separator = '.') => {
    // Convert to number if it's a string
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

    // Handle NaN cases (if the input wasn't a valid number)
    if (isNaN(numericPrice)) {
        return '0';
    }

    // Format the number with thousand separators
    return numericPrice
        .toString()
        .replace(/\D/g, '') // Remove any non-digit characters
        .replace(/\B(?=(\d{3})+(?!\d))/g, separator); // Add separators
};

/**
 * Alternative implementation using Intl.NumberFormat
 * @param {number|string} price
 * @returns {string}
 */
export const formatPriceIntl = (price) => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

    if (isNaN(numericPrice)) {
        return '0';
    }

    return new Intl.NumberFormat('id-ID').format(numericPrice);
};
