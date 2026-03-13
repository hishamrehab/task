import DashboardHeader from '../components/dashboard/DashboardHeader'
import RevenueChart from '../components/dashboard/RevenueChart'
import StatsGrid from '../components/dashboard/StatsGrid'
import { Stats } from '../data/dashbaordData'

const DashboardPage = () => {
    return (
        <div className="space-y-6 animate-fadeIn">
            <DashboardHeader />
            <StatsGrid stats={Stats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="col-span-2">
                    <RevenueChart />
                </div>
            </div>

        </div>
    )
}

export default DashboardPage