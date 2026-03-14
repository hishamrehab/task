import React from 'react'
import MetricCard from './MetricCard';


interface BottomMetricsGridProps {
    metrics: {
        conversionRate: string;
        avgOrderValue: string;
        premiumUsers: string;
        retentionRate: string;
        conversionGrowth: number;
        avgOrderGrowth: number;
        premiumGrowth: number;
        retentionGrowth: number;
    };
}


const BottomMetricsGrid = ({ metrics }: BottomMetricsGridProps) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricCard
                title="Conversion Rate"
                value={metrics.conversionRate}
                growth={metrics.conversionGrowth}
                icon="LineChart"
                color="teal"
            />
            <MetricCard
                title="Avg. Order Value"
                value={metrics.avgOrderValue}
                growth={metrics.avgOrderGrowth}
                icon="CircleDollarSign"
                color="orange"
            />
            <MetricCard
                title="Premium Users"
                value={metrics.premiumUsers}
                growth={metrics.premiumGrowth}
                icon="Crown"
                color="violet"
            />
            <MetricCard
                title="Retention Rate"
                value={metrics.retentionRate}
                growth={metrics.retentionGrowth}
                icon="Heart"
                color="rose"
            />
        </div>
    )
}

export default BottomMetricsGrid