// src/types/index.ts

export type UserStatus = 'Active' | 'Inactive';
export type SortOrder = 'asc' | 'desc';

export interface User {
    id: number;
    name: string;
    email: string;
    status: UserStatus;
    createdAt: string;
}

export type OrderStatus = 'Pending' | 'Paid' | 'Cancelled' | 'Delivered';

export interface Order {
    id: number;
    userId: number;
    amount: number;
    currency: string;
    status: OrderStatus;
    createdAt: string;
}

export interface UsersFilters {
    search: string;
    status: UserStatus | 'All';
    sort: SortOrder;
    page: number;
    pageSize: number;
}

export interface UsersResponse {
    users: User[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

// Dashboard static data types
export interface DashboardStats {
    totalUsers: number;
    activeUsers: number;
    totalOrders: number;
    totalRevenue: number;
    usersGrowth: number;
    activeGrowth: number;
    ordersGrowth: number;
    revenueGrowth: number;
}

export interface DashboardProduct {
    id: number;
    name: string;
    sales: number;
    revenue: number;
    color: string;
    percentage: number;
}

export type ActivityType = 'user' | 'order' | 'shipment' | 'upgrade';

export interface DashboardActivity {
    id: number;
    type: ActivityType;
    title: string;
    time: string;
    icon: string;
    color: string;
}

export interface DashboardMetrics {
    conversionRate: string;
    avgOrderValue: string;
    premiumUsers: string;
    retentionRate: string;
    conversionGrowth: number;
    avgOrderGrowth: number;
    premiumGrowth: number;
    retentionGrowth: number;
}


export interface NavItem {
    path: string;
    icon: string;
    label: string;
    title: string;
}

export interface SidebarProps {
    isOpen: boolean;
    isCollapsed: boolean;
    onClose: () => void;
    onToggleCollapse: () => void;
    onMobileMenuToggle: (value: boolean) => void;
}

export interface HeaderProps {
    toggleSidebar: () => void;
    isSidebarCollapsed: boolean;
}