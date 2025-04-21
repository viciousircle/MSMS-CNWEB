export const getPageNumbers = (totalPages, currentPage, delta = 2) => {
    const pages = [];
    const range = [];

    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    for (let i = left; i <= right; i++) {
        range.push(i);
    }

    if (left > 2) {
        pages.push(1, 'left-ellipsis', ...range);
    } else {
        pages.push(...Array.from({ length: right }, (_, i) => i + 1));
    }

    if (right < totalPages - 1) {
        pages.push('right-ellipsis', totalPages);
    } else if (!pages.includes(totalPages)) {
        pages.push(totalPages);
    }

    return pages;
};
