import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { OrderWithDetails } from "@/types";
import { Badge } from "../ui/badge";
import { Calendar, Package, UserIcon, CreditCard, ShoppingBag, Mail, Printer } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface OrderDetailsModalProps {
    order: OrderWithDetails | null;
    open: boolean;
    onClose: () => void;
}

const statusConfig: Record<string, { bg: string; text: string }> = {
    Delivered: { bg: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20', text: 'Delivered' },
    Shipped: { bg: 'bg-blue-500/10 text-blue-600 border-blue-500/20', text: 'Shipped' },
    Pending: { bg: 'bg-amber-500/10 text-amber-600 border-amber-500/20', text: 'Pending' },
    Paid: { bg: 'bg-teal-500/10 text-teal-600 border-teal-500/20', text: 'Paid' },
    Cancelled: { bg: 'bg-red-500/10 text-red-600 border-red-500/20', text: 'Cancelled' },
};

export const OrderDetailsModal = ({ order, open, onClose }: OrderDetailsModalProps) => {
    if (!order) return null;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handlePrint = () => {
        console.log('Print invoice for order:', order.id);
    };

    const handleEmail = () => {
        console.log('Email customer for order:', order.id);
    };

    const statusStyle = statusConfig[order.status] || statusConfig.Pending;

    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Order Details</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Header Info */}
                    <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-teal-500/10 flex items-center justify-center border border-teal-500/20 flex-shrink-0">
                            <ShoppingBag className="w-8 h-8 text-teal-600" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-xl font-semibold">ORD-{order.id}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                <span>Ordered on {formatDate(order.createdAt)}</span>
                            </div>
                            <div className="text-2xl font-bold text-foreground">
                                {order.amount.toFixed(2)} {order.currency}
                            </div>
                        </div>
                    </div>

                    {/* Quick Badges */}
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className={cn("px-3 py-1 border", statusStyle.bg)}>
                            {statusStyle.text}
                        </Badge>
                        <Badge variant="outline" className="px-3 py-1">
                            <CreditCard className="w-3 h-3 mr-1" />
                            Credit Card
                        </Badge>
                        <Badge variant="outline" className="px-3 py-1">
                            <UserIcon className="w-3 h-3 mr-1" />
                            {order.customerName}
                        </Badge>
                    </div>

                    {/* Section Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-muted/50 rounded-xl border border-border">
                            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                                <UserIcon className="w-4 h-4 text-teal-600" />
                                Customer Information
                            </h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Name</span>
                                    <span className="font-medium">{order.customerName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Payment</span>
                                    <span className="font-medium">Credit Card</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-muted/50 rounded-xl border border-border">
                            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                                <Package className="w-4 h-4 text-teal-600" />
                                Product Details
                            </h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Product</span>
                                    <span className="font-medium">{order.product}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Qty</span>
                                    <span className="font-medium">1</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-border">
                        <Button
                            onClick={handlePrint}
                            className="flex-1 bg-teal-500 hover:bg-teal-600 text-white"
                        >
                            <Printer className="w-4 h-4 mr-2" />
                            Print Invoice
                        </Button>
                        <Button
                            onClick={handleEmail}
                            variant="outline"
                            className="flex-1"
                        >
                            <Mail className="w-4 h-4 mr-2" />
                            Email Customer
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default OrderDetailsModal;
