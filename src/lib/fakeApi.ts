import userData from "../data/users.json";
import ordersData from "../data/orders.json";
import type { Order, User, UsersFilters, UsersResponse } from "../types";

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

export async function getAllOrders(): Promise<Order[]> {
    await delay(200);
    return orders;
}