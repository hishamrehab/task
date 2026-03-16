import userData from "../data/users.json";
import ordersData from "../data/orders.json";
import type { Order, OrdersFilter, OrdersResponse, OrderStats, OrderStatus, OrderWithDetails, User, UsersFilters, UsersResponse } from "../types";

const users: User[] = userData as User[];
const orders: Order[] = ordersData as Order[];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


export async function getUsers(filters: UsersFilters): Promise<UsersResponse> {
    await delay(300);

    let filtered = [...users];

    if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(
            user =>
                user.name.toLowerCase().includes(searchLower) ||
                user.email.toLowerCase().includes(searchLower)
        );
    }

    if (filters.status !== "All") {
        filtered = filtered.filter(user => user.status === filters.status);
    }

    filtered.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return filters.sort === 'asc' ? dateA - dateB : dateB - dateA;
    });

    const total = filtered.length;
    const start = (filters.page - 1) * filters.pageSize;
    const end = start + filters.pageSize;
    const paginatedUsers = filtered.slice(start, end);

    return {
        users: paginatedUsers,
        total,
        page: filters.page,
        pageSize: filters.pageSize,
        totalPages: Math.ceil(total / filters.pageSize)
    };
}


export async function getUserOrders(userId: number): Promise<Order[]> {
    await delay(150);
    return orders.filter(o => o.userId === userId);
}

export async function getOrdersPaginated(
    filters: OrdersFilter,

): Promise<OrdersResponse> {
    await delay(300);

    let filtered = await getEnrichedOrders();

    if (filters.status !== 'All') {
        filtered = filtered.filter(o => o.status === filters.status);
    }

    if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(
            o =>
                o.id.toString().includes(searchLower) ||
                o.customerName.toLowerCase().includes(searchLower) ||
                o.product.toLowerCase().includes(searchLower)
        );
    }
    const total = filtered.length;
    const start = (filters.page - 1) * filters.pageSize;
    const end = start + filters.pageSize;
    const paginatedOrders = filtered.slice(start, end);

    return {
        orders: paginatedOrders,
        total,
        page: filters.page,
        pageSize: filters.pageSize,
        totalPages: Math.ceil(total / filters.pageSize)
    };
}




export async function getAllOrdersForStats(): Promise<OrderWithDetails[]> {
    await delay(200);
    return getEnrichedOrders();
}







export async function getAllOrders(): Promise<Order[]> {
    await delay(200);
    return orders;
}

const productNames = [
    'Premium Wireless Headphones',
    'Smart Watch Pro',
    'Laptop Stand Deluxe',
    'Mechanical Keyboard RGB',
    'Ergonomic Office Chair',
    'USB-C Hub 7-in-1',
    'Wireless Mouse Pro',
    '4K Webcam Ultra HD',
    'Desk Lamp LED Smart',
    'Monitor 27 inch 4K',
    'Bluetooth Speaker Premium',
    'Phone Stand Adjustable',
];


const getProductForOrder = (orderId: number): string => {
    const index = (orderId - 1) % productNames.length;
    return productNames[index];
};


const getInitials = (name: string): string => {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

export async function getEnrichedOrders(): Promise<OrderWithDetails[]> {
    await delay(200);
    return orders.map(order => {
        const user = users.find(u => u.id === order.userId);
        const customerName = user ? user.name : 'Unknown Customer';
        return {
            ...order,
            customerName,
            customerInitials: getInitials(customerName),
            product: getProductForOrder(order.id),
        };
    });
}



export async function getOrdersStats(): Promise<OrderStats> {
    await delay(300);
    const enriched = await getEnrichedOrders();
    const totalOrders = enriched.length;
    const processing = enriched.filter(order => order.status === 'Pending').length;
    const shipped = enriched.filter(order => order.status === 'Shipped').length;
    const delivered = enriched.filter(order => order.status === 'Delivered').length;
    const cancelled = enriched.filter(order => order.status === 'Cancelled').length;
    const totalRevenue = enriched.reduce((sum, order) => sum + order.amount, 0);

    return {
        totalOrders,
        processing,
        shipped,
        delivered,
        cancelled,
        totalRevenue,
    };
}


export async function getOrders(
    status: OrderStatus | 'All' = 'All',
    search: string = ''
): Promise<OrderWithDetails[]> {
    await delay(300);
    let enriched = await getEnrichedOrders();

    if (status !== 'All') {
        enriched = enriched.filter(o => o.status === status);
    }

    if (search) {
        const searchLower = search.toLowerCase();
        enriched = enriched.filter(
            order =>
                order.id.toString().includes(searchLower) ||
                order.customerName.toLowerCase().includes(searchLower) ||
                order.product.toLowerCase().includes(searchLower)
        );
    }

    return enriched;
}