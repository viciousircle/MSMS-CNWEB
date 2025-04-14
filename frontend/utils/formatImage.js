/**
 * Cleans image URLs by removing unwanted quotes and whitespace
 * @param {string} imgUrl - The raw image URL
 * @returns {string} Cleaned image URL
 */
export const cleanImageUrl = (imgUrl) => {
    if (!imgUrl) return '';
    return imgUrl.replace(/^"+|"+$/g, '').trim();
};

/**
 * Generates a fallback image URL if the primary image is invalid
 * @param {string} imgUrl - The primary image URL
 * @param {string} [fallback='/images/default-product.png'] - Fallback image path
 * @returns {string} Valid image URL
 */
export const getSafeImageUrl = (
    imgUrl,
    fallback = '/images/default-product.png'
) => {
    const cleanedUrl = cleanImageUrl(imgUrl);
    if (!cleanedUrl || !isValidImageUrl(cleanedUrl)) {
        return fallback;
    }
    return cleanedUrl;
};

/**
 * Checks if an image URL is valid
 * @param {string} url - The image URL to validate
 * @returns {boolean} True if the URL is valid
 */
export const isValidImageUrl = (url) => {
    if (!url) return false;

    try {
        // Basic URL validation
        new URL(url);

        // Check for common image extensions
        const imageExtensions = [
            '.jpg',
            '.jpeg',
            '.png',
            '.gif',
            '.webp',
            '.svg',
        ];
        return imageExtensions.some((ext) => url.toLowerCase().includes(ext));
    } catch {
        return false;
    }
};

/**
 * Creates an optimized image URL for different sizes (useful for CDN or image services)
 * @param {string} url - Original image URL
 * @param {Object} options - Size options
 * @param {number} [options.width=300] - Desired width
 * @param {number} [options.height=300] - Desired height
 * @param {number} [options.quality=80] - Image quality (0-100)
 * @returns {string} Optimized image URL
 */
export const getOptimizedImageUrl = (
    url,
    { width = 300, height = 300, quality = 80 } = {}
) => {
    if (!isValidImageUrl(url)) return url;

    // Example implementation for Cloudinary or similar services
    if (url.includes('res.cloudinary.com')) {
        return url.replace(
            /upload\//,
            `upload/w_${width},h_${height},q_${quality}/`
        );
    }

    // Add other CDN-specific optimizations as needed
    return url;
};
