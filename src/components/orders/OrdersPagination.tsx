import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface OrdersPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const OrdersPagination = ({ currentPage, totalPages, onPageChange }: OrdersPaginationProps) => {
    return (
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-white/6">
            <p className="text-sm text-gray-500 dark:text-slate-400">
                Page {currentPage} of {totalPages}
            </p>
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1"
                >
                    Next
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
};

export default OrdersPagination;