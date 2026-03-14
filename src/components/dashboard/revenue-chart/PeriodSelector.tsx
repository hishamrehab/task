import { Button } from "../../ui/button";

interface PeriodSelectorProps {
    period: '6M' | '12M' | 'YTD';
    onChange: (period: '6M' | '12M' | 'YTD') => void;
}

const PeriodSelector = ({ period, onChange }: PeriodSelectorProps) => {
    return (
        <div className="flex items-center gap-1 rounded-xl p-1 border bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10">
            <Button
                variant={period === '6M' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onChange('6M')}
                className="px-3 py-1 h-auto text-xs"
            >
                6M
            </Button>
            <Button
                variant={period === '12M' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onChange('12M')}
                className="px-3 py-1 h-auto text-xs"
            >
                12M
            </Button>
            <Button
                variant={period === 'YTD' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onChange('YTD')}
                className="px-3 py-1 h-auto text-xs"
            >
                YTD
            </Button>
        </div>
    );
};

export default PeriodSelector;