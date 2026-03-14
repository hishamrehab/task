interface BarChartProps {
    data: { month: string; value: number }[];
    maxValue: number;
    chartHeight: number;
    bestMonth: string;
}

const BarChart = ({ data, maxValue, chartHeight, bestMonth }: BarChartProps) => {
    return (
        <div className="flex items-end gap-2 h-36 mb-3">
            {data.map((item) => {
                const barHeight = (item.value / maxValue) * chartHeight;
                const isBest = item.month === bestMonth;
                return (
                    <div key={item.month} className="flex-1 flex flex-col items-center gap-1 group cursor-pointer">
                        <div className="relative w-full flex items-end" style={{ height: chartHeight }}>
                            <div
                                className={`w-full rounded-t-lg transition-all duration-300 ${isBest ? 'opacity-100' : 'opacity-40 group-hover:opacity-70'
                                    }`}
                                style={{
                                    height: `${barHeight}px`,
                                    background: isBest
                                        ? 'linear-gradient(rgb(20, 184, 166), rgb(13, 148, 136))'
                                        : 'linear-gradient(rgb(226, 232, 240), rgb(203, 213, 225))',
                                }}
                            />
                            {/* Tooltip */}
                            <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-gray-900 dark:text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none bg-white dark:bg-slate-800 border border-gray-200 dark:border-white/10 shadow-lg">
                                EGP {item.value.toLocaleString()}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default BarChart;