interface ChartSummaryProps {
    totalRevenue: number;
    avgRevenue: number;
    bestMonth: string;
}

const ChartSummary = ({ totalRevenue, avgRevenue, bestMonth }: ChartSummaryProps) => {
    return (
        <div className="flex items-center gap-6 mt-5 pt-4 border-t border-gray-100 dark:border-white/6">
            <div>
                <p className="text-xs text-gray-500 dark:text-slate-400">Total Revenue</p>
                <p className="text-base font-bold text-gray-900 dark:text-white">
                    EGP {totalRevenue.toLocaleString()}
                </p>
            </div>
            <div>
                <p className="text-xs text-gray-500 dark:text-slate-400">Avg / Month</p>
                <p className="text-base font-bold text-gray-900 dark:text-white">
                    EGP {avgRevenue.toLocaleString()}
                </p>
            </div>
            <div>
                <p className="text-xs text-gray-500 dark:text-slate-400">Best Month</p>
                <p className="text-base font-bold text-teal-400">{bestMonth}</p>
            </div>
        </div>
    );
};

export default ChartSummary;