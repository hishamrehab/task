import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    fullPage?: boolean;
}

export const LoadingSpinner = ({
    size = 'lg',
    className,
    fullPage = false
}: LoadingSpinnerProps) => {
    const sizeMap = {
        sm: 'w-5 h-5',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16',
    };

    const spinner = (
        <div className={cn("relative", sizeMap[size], className)}>
            {/* Outer Glow */}
            <div className="absolute inset-0 rounded-full border-4 border-primary/10 animate-pulse" />
            
            {/* Background Circle */}
            <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
            
            {/* Spinning Arc */}
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
            
            {/* Inner Gradient Orbit */}
            <div className="absolute inset-2 rounded-full border-2 border-teal-500/30 border-b-transparent animate-[spin_1.5s_linear_infinite_reverse]" />
        </div>
    );

    if (fullPage) {
        return (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/60 dark:bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-300">
                <div className="relative">
                    {spinner}
                </div>
                <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse">
                    Loading resources...
                </p>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center py-12 w-full animate-in fade-in duration-500">
            {spinner}
        </div>
    );
};

export default LoadingSpinner;
