import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import type { OrderWithDetails, OrderStatus } from '../../types';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';


interface EditOrderModalProps {
    order: OrderWithDetails | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (updatedOrder: OrderWithDetails) => void;
}


const EditOrderModal = ({
    order,
    open,
    onOpenChange,
    onSave }: EditOrderModalProps) => {

    const [formData, setFormData] = useState({
        customerName: '',
        product: '',
        status: 'Pending' as OrderStatus,
        amount: 0,
    });

    useEffect(() => {
        if (order) {
            setFormData({
                customerName: order.customerName,
                product: order.product,
                status: order.status,
                amount: order.amount,
            })
        }
    }, [order]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!order) return;


        const updatedOrder: OrderWithDetails = {
            ...order,
            customerName: formData.customerName,
            product: formData.product,
            status: formData.status,
            amount: formData.amount,
        };

        onSave(updatedOrder);
        onOpenChange(false);

    }


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Order</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className="space-y-2">
                        <Label htmlFor="customerName">Customer Name</Label>
                        <Input
                            id="customerName"
                            value={formData.customerName}
                            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="product">Product</Label>
                        <Input
                            id="product"
                            value={formData.product}
                            onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                            id="amount"
                            type="number"
                            step="0.01"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                            required
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor="status">Status</Label>
                        <Select value={formData.status}
                            onValueChange={(value: OrderStatus) =>
                                setFormData({ ...formData, status: value })
                            }>
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="Paid">Paid</SelectItem>
                                <SelectItem value="Shipped">Shipped</SelectItem>
                                <SelectItem value="Delivered">Delivered</SelectItem>
                                <SelectItem value="Cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditOrderModal
