// src/types/index.ts

export type UserStatus = 'Active' | 'Inactive';
export type SortOrder = 'asc' | 'desc';



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
}

export interface HeaderProps {
    toggleSidebar: () => void;
    isCollapsed: boolean;
}


export interface UserEngagementProps {
    activeUsers: number;
    inactiveUsers: number;
    avgOrdersPerUser: number;
}

export interface UserWithStats extends User {
    ordersCount: number;
    totalSpent: number;
    role: string;
}

export interface UsersPageProps { }



export interface User {
    id: number;
    name: string;
    email: string;
    status: UserStatus;
    createdAt: string;
    imgUrl?: string;
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




export type OrderStatus = 'Pending' | 'Paid' | 'Cancelled' | 'Delivered' | 'Shipped';

export interface Order {
    id: number;
    userId: number;
    amount: number;
    currency: string;
    status: OrderStatus;
    createdAt: string;
}


export interface OrderStats {
    totalOrders: number;
    processing: number;
    shipped: number;
    delivered: number;
    cancelled: number;
    totalRevenue: number;
}

export interface OrderWithDetails extends Order {
    customerName: string;
    customerInitials: string;
    product: string;
}




export interface OrdersFilter {
    status: OrderStatus | 'All';
    search: string;
    page: number;
    pageSize: number;
}

export interface OrdersResponse {
    orders: OrderWithDetails[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}