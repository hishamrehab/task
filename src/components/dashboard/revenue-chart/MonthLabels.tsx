interface MonthLabelsProps {
    data: { month: string }[];
}

const MonthLabels = ({ data }: MonthLabelsProps) => {
    return (
        <div className="flex items-center justify-between text-xs text-gray-400 dark:text-slate-500 px-0.5">
            {data.map((item) => (
                <span key={item.month} className="flex-1 text-center">
                    {item.month}
                </span>
            ))}
        </div>
    );
};

export default MonthLabels;