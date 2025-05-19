/**
 * Utility functions for converting between MongoDB ObjectIDs and shorter display IDs
 */

// Convert MongoDB ID to a shorter display ID
export function toShortId(mongoId) {
    if (!mongoId) return '';

    // Take the last 8 characters of the MongoDB ID
    const shortId = mongoId.slice(-8);

    // Convert to base36 for even shorter representation
    const num = parseInt(shortId, 16);
    return num.toString(36).toUpperCase();
}

// Convert short ID back to MongoDB ID (partial)
export function fromShortId(shortId) {
    if (!shortId) return '';

    // Convert from base36 back to hex
    const num = parseInt(shortId, 36);
    return num.toString(16).padStart(8, '0');
}

// Format display ID with prefix
export function formatDisplayId(mongoId, prefix = 'ID-') {
    return `${prefix}${toShortId(mongoId)}`;
}
