import { useState } from 'react';
import { Card } from '@/components/ui/card';
import PeriodSelector from './PeriodSelector';
import BarChart from './BarChart';
import MonthLabels from './MonthLabels';
import ChartSummary from './ChartSummary';

// Static monthly data – could be moved to a separate file later
const monthlyData = [
    { month: 'Jan', value: 2400 },
    { month: 'Feb', value: 2800 },
    { month: 'Mar', value: 3200 },
    { month: 'Apr', value: 2900 },
    { month: 'May', value: 3500 },
    { month: 'Jun', value: 3800 },
    { month: 'Jul', value: 4200 },
    { month: 'Aug', value: 3900 },
    { month: 'Sep', value: 4500 },
    { month: 'Oct', value: 4800 },
    { month: 'Nov', value: 5200 },
    { month: 'Dec', value: 5650 },
];

const RevenueChart = () => {
    const [period, setPeriod] = useState<'6M' | '12M' | 'YTD'>('12M');

    const getDisplayData = () => {
        switch (period) {
            case '6M':
                return monthlyData.slice(6);
            case 'YTD':
                return monthlyData.slice(0, new Date().getMonth() + 1);
            case '12M':
            default:
                return monthlyData;
        }
    };

    const displayData = getDisplayData();
    const maxValue = Math.max(...monthlyData.map(d => d.value));
    const chartHeight = 120;

    const totalRevenue = displayData.reduce((sum, d) => sum + d.value, 0);
    const avgRevenue = Math.round(totalRevenue / displayData.length);
    const bestMonth = displayData.reduce((best, d) => (d.value > best.value ? d : best), displayData[0]);

    return (
        <Card className="rounded-2xl border p-6 bg-white dark:bg-slate-800/60 border-gray-100 dark:border-white/6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">Revenue Overview</h3>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">Monthly revenue for 2024</p>
                </div>
                <PeriodSelector period={period} onChange={setPeriod} />
            </div>

            <BarChart
                data={displayData}
                maxValue={maxValue}
                chartHeight={chartHeight}
                bestMonth={bestMonth.month}
            />

            <MonthLabels data={displayData} />

            <ChartSummary
                totalRevenue={totalRevenue}
                avgRevenue={avgRevenue}
                bestMonth={bestMonth.month}
            />
        </Card>
    );
};

export default RevenueChart;