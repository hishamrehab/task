import React from 'react'

interface LegendProps {
    activeUsers: number;
    inactiveUsers: number;
    avgOrdersPerUser: number;
}


const Legend = ({ activeUsers, inactiveUsers, avgOrdersPerUser }: LegendProps) => {
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-teal-500"></span>
                    <span className="text-xs text-gray-500 dark:text-slate-400">Active Users</span>
                </div>
                <span className="text-xs font-bold text-gray-900 dark:text-white">{activeUsers}</span>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-gray-200 dark:bg-white/15"></span>
                    <span className="text-xs text-gray-500 dark:text-slate-400">Inactive Users</span>
                </div>
                <span className="text-xs font-bold text-gray-900 dark:text-white">{inactiveUsers}</span>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-orange-400"></span>
                    <span className="text-xs text-gray-500 dark:text-slate-400">Avg Orders/User</span>
                </div>
                <span className="text-xs font-bold text-gray-900 dark:text-white">{avgOrdersPerUser}</span>
            </div>
        </div>
    )
}

export default Legend