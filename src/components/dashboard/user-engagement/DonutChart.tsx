interface DonutChartProps {
    percentage: number;
}

const DonutChart = ({ percentage }: DonutChartProps) => {
    // Calculate the dash offset for the circle
    const radius = 15.9;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference * (1 - percentage / 100);

    return (
        <div className="relative w-32 h-32">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">

                <circle
                    cx="18"
                    cy="18"
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    className="text-gray-100 dark:text-white/6"
                />

                <circle
                    cx="18"
                    cy="18"
                    r={radius}
                    fill="none"
                    stroke="url(#tealGrad)"
                    strokeWidth="3.5"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                />
                <defs>
                    <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#14b8a6" />
                        <stop offset="100%" stopColor="#0d9488" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {percentage}%
                </span>
                <span className="text-xs text-gray-500 dark:text-slate-400">Active</span>
            </div>
        </div>
    );
};

export default DonutChart;