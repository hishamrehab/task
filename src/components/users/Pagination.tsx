import { Button } from "../ui/button";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    return (
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
                Page <span className="font-medium text-foreground">{currentPage}</span> of <span className="font-medium text-foreground">{totalPages}</span>
            </p>
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="h-8 px-3"
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-8 px-3"
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default Pagination;