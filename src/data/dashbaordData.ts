// src/data/mockDashboard.ts

import type { DashboardActivity, DashboardMetrics, DashboardProduct, DashboardStats } from "../types";

export const Stats: DashboardStats = {
    totalUsers: 156,
    activeUsers: 142,
    totalOrders: 234,
    totalRevenue: 28450.75,
    usersGrowth: 15.7,
    activeGrowth: 6.2,
    ordersGrowth: 8.3,
    revenueGrowth: 12.5,
};

export const Products: DashboardProduct[] = [
    {
        id: 1,
        name: 'Premium Wireless Headphones',
        sales: 145,
        revenue: 43455,
        color: 'teal',
        percentage: 100,
    },
    {
        id: 2,
        name: 'Smart Watch Pro',
        sales: 98,
        revenue: 43902,
        color: 'violet',
        percentage: 67.6,
    },
    {
        id: 3,
        name: 'Ergonomic Office Chair',
        sales: 76,
        revenue: 30324,
        color: 'orange',
        percentage: 52.4,
    },
    {
        id: 4,
        name: 'Monitor 27 inch 4K',
        sales: 54,
        revenue: 29646,
        color: 'emerald',
        percentage: 37.2,
    },
    {
        id: 5,
        name: 'Mechanical Keyboard RGB',
        sales: 89,
        revenue: 14239.11,
        color: 'rose',
        percentage: 61.4,
    },
];

export const Activities: DashboardActivity[] = [
    {
        id: 1,
        type: 'user',
        title: 'New user Sarah Johnson registered',
        time: '2 min ago',
        icon: 'UserPlus',
        color: 'teal',
    },
    {
        id: 2,
        type: 'order',
        title: 'Order #ORD-2024-1009 delivered',
        time: '18 min ago',
        icon: 'CheckCircle',
        color: 'emerald',
    },
    {
        id: 3,
        type: 'shipment',
        title: 'Order #ORD-2024-1008 shipped',
        time: '1 hr ago',
        icon: 'Truck',
        color: 'amber',
    },
    {
        id: 4,
        type: 'order',
        title: 'Order #ORD-2024-1007 was cancelled',
        time: '3 hr ago',
        icon: 'XCircle',
        color: 'rose',
    },
    {
        id: 5,
        type: 'upgrade',
        title: 'Jessica Park upgraded to Premium',
        time: '5 hr ago',
        icon: 'Crown',
        color: 'violet',
    },
];

export const Metrics: DashboardMetrics = {
    conversionRate: '68.4%',
    avgOrderValue: 'EGP 1,456',
    premiumUsers: '42%',
    retentionRate: '91.2%',
    conversionGrowth: 2.1,
    avgOrderGrowth: 5.3,
    premiumGrowth: 1.8,
    retentionGrowth: 0.4,
};