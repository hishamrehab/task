import type { DashboardStats } from "../../types";
import StatsCard from "./StatsCard"

interface StatsGridProps {
    stats: DashboardStats;
}
const StatsGrid = ({ stats }: StatsGridProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <StatsCard
                title="Total Users"
                value={stats.totalUsers}
                growth={stats.usersGrowth}
                icon="Users"
                color="violet"
                strokeColor="#8b5cf6" />
            <StatsCard
                title="Active Users"
                value={stats.activeUsers}
                growth={stats.activeGrowth}
                icon="UserCheck"
                color="teal"
                strokeColor="#14b8a6"
            />

            <StatsCard
                title="Total Orders"
                value={stats.totalOrders}
                growth={stats.ordersGrowth}
                icon="ShoppingBag"
                color="orange"
                strokeColor="#f97316"
            />
            <StatsCard
                title="Total Revenue"
                value={`EGP ${stats.totalRevenue.toLocaleString()}`}
                growth={stats.revenueGrowth}
                icon="CircleDollarSign"
                color="emerald"
                strokeColor="#10b981"
            />
        </div>
    )
}

export default StatsGrid