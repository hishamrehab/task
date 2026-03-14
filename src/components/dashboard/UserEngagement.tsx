import type { UserEngagementProps } from '../../types'
import { Card } from '../ui/card';
import DonutChart from './user-engagement/DonutChart';
import Legend from './user-engagement/Legend';


const UserEngagement = ({
    activeUsers,
    inactiveUsers,
    avgOrdersPerUser,
}: UserEngagementProps) => {
    const total = activeUsers + inactiveUsers;
    const activePercentage = total > 0 ? Math.round((activeUsers / total) * 1000) / 10 : 0;

    return (
        <Card className="rounded-2xl border p-6 flex flex-col bg-white dark:bg-slate-800/60 border-gray-100 dark:border-white/6 shadow-sm">
            <div className="mb-5">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">User Engagement</h3>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
                    Active vs inactive users
                </p>
            </div>

            <div className="flex items-center justify-center flex-1 mb-5">
                <DonutChart percentage={activePercentage} />
            </div>

            <Legend
                activeUsers={activeUsers}
                inactiveUsers={inactiveUsers}
                avgOrdersPerUser={avgOrdersPerUser}
            />

        </Card>
    )
}

export default UserEngagement