import { useEffect, useState } from "react";
import type { Order, UserWithStats } from "../../types";
import { getUserOrders } from "../../lib/fakeApi";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Calendar, Mail, Package, UserIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "../../lib/utils";

interface UserDetailsModalProps {
    user: UserWithStats | null;
    open: boolean;
    onClose: () => void;
}


const UserDetailsModal = ({ user, open, onClose }: UserDetailsModalProps) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user && open) {
            setLoading(true);
            getUserOrders(user.id)
                .then(setOrders)
                .catch(console.error)
                .finally(() => setLoading(false));
        }
    }, [user, open])

    if (!user) return null;

    const avatarUrl = user.imgUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user.name
    )}&background=random&color=fff&size=80&font-size=0.5&length=2`;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };


    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>User Details</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* User Info */}
                    <div className="flex items-start gap-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden border border-border flex-shrink-0">
                            <img
                                src={avatarUrl}
                                alt={user.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-xl font-semibold">{user.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Mail className="w-4 h-4" />
                                <span>{user.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                <span>Joined {formatDate(user.createdAt)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats Badges */}
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="px-3 py-1">
                            <UserIcon className="w-3 h-3 mr-1" />
                            {user.role}
                        </Badge>
                        <Badge
                            variant={user.status === 'Active' ? 'default' : 'secondary'}
                            className={cn(
                                user.status === 'Active' && 'bg-green-500/10 text-green-600 border-green-500/20'
                            )}
                        >
                            {user.status}
                        </Badge>
                        <Badge variant="outline" className="px-3 py-1">
                            <Package className="w-3 h-3 mr-1" />
                            {user.ordersCount} orders
                        </Badge>
                        <Badge variant="outline" className="px-3 py-1">
                            Total spent: ${user.totalSpent.toFixed(2)}
                        </Badge>
                    </div>

                    {/* Orders List */}
                    <div>
                        <h4 className="text-sm font-medium mb-3">Order History</h4>
                        {loading ? (
                            <div className="flex justify-center py-8">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                            </div>
                        ) : orders.length === 0 ? (
                            <p className="text-sm text-muted-foreground text-center py-4">
                                No orders found for this user.
                            </p>
                        ) : (
                            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                                {orders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg text-sm"
                                    >
                                        <div>
                                            <p className="font-medium">Order #{order.id}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold">
                                                {order.currency} {order.amount.toFixed(2)}
                                            </p>
                                            <Badge
                                                variant="outline"
                                                className={cn(
                                                    'text-[10px] px-1.5 py-0',
                                                    order.status === 'Paid' && 'bg-green-500/10 text-green-600 border-green-500/20',
                                                    order.status === 'Pending' && 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
                                                    order.status === 'Cancelled' && 'bg-red-500/10 text-red-600 border-red-500/20'
                                                )}
                                            >
                                                {order.status}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default UserDetailsModal