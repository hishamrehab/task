import React from 'react'
import { Card } from '../ui/card'
import { LineChart, CircleDollarSign, Crown, Heart } from 'lucide-react';
import { Badge } from '../ui/badge';


interface MetricCardProps {
    title: string;
    value: string;
    growth: number;
    icon: 'LineChart' | 'CircleDollarSign' | 'Crown' | 'Heart';
    color: 'teal' | 'orange' | 'violet' | 'rose';
}

const iconMap = {
    LineChart,
    CircleDollarSign,
    Crown,
    Heart,
};


const colorMap = {
    teal: 'border-teal-500/20',
    orange: 'border-orange-500/20',
    violet: 'border-violet-500/20',
    rose: 'border-rose-500/20',
};

const bgColorMap = {
    teal: 'bg-teal-500/15',
    orange: 'bg-orange-500/15',
    violet: 'bg-violet-500/15',
    rose: 'bg-rose-500/15',
};

const textColorMap = {
    teal: 'text-teal-400',
    orange: 'text-orange-400',
    violet: 'text-violet-400',
    rose: 'text-rose-400',
};

const MetricCard = ({ title, value, growth, icon, color }: MetricCardProps) => {
    const Icon = iconMap[icon];


    return (
        <Card
            className={`rounded-2xl border p-5 hover:-translate-y-0.5 transition-all duration-300 bg-white dark:bg-slate-800/60 border-gray-100 dark:border-white/6 shadow-sm ${colorMap[color]}`}
        >
            <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl ${bgColorMap[color]} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${textColorMap[color]}`} />
                </div>
                <Badge variant="default" className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                    +{growth}%
                </Badge>
            </div>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{title}</p>
        </Card>)
}

export default MetricCard