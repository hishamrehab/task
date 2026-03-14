import BottomMetricsGrid from '../components/dashboard/BottomMetricsGrid'
import DashboardHeader from '../components/dashboard/DashboardHeader'
import RevenueChart from '../components/dashboard/revenue-chart/RevenueChart'
import StatsGrid from '../components/dashboard/StatsGrid'
import UserEngagement from '../components/dashboard/UserEngagement'
import { Stats, Metrics } from '../data/dashbaordData'

const DashboardPage = () => {
    return (
        <div className="space-y-6 animate-fadeIn">
            <DashboardHeader />
            <StatsGrid stats={Stats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="col-span-2">
                    <RevenueChart />
                </div>
                <UserEngagement
                    activeUsers={Stats.activeUsers}
                    inactiveUsers={Stats.totalUsers - Stats.activeUsers}
                    avgOrdersPerUser={1.5}
                />
            </div>
            <BottomMetricsGrid metrics={Metrics} />
        </div>
    )
}

export default DashboardPage