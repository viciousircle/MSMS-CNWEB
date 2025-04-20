import React from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

const getPageNumbers = (totalPages, currentPage, delta = 2) => {
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

export const PaginationControls = ({
    totalPages,
    currentPage,
    onPageChange,
}) => {
    const pageNumbers = getPageNumbers(totalPages, currentPage);

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) {
                                onPageChange(currentPage - 1);
                            }
                        }}
                        disabled={currentPage === 1}
                    />
                </PaginationItem>

                {pageNumbers.map((page, index) => {
                    if (page === 'left-ellipsis' || page === 'right-ellipsis') {
                        return (
                            <PaginationItem key={`ellipsis-${index}`}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }

                    return (
                        <PaginationItem key={page}>
                            <PaginationLink
                                href="#"
                                isActive={page === currentPage}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onPageChange(page);
                                }}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) {
                                onPageChange(currentPage + 1);
                            }
                        }}
                        disabled={currentPage === totalPages}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};
