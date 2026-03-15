import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import type { UserWithStats } from '../../types';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';


interface EditUserModalProps {
    user: UserWithStats | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (updatedUser: UserWithStats) => void;
}


const EditUserModal = ({
    user,
    open,
    onOpenChange,
    onSave }: EditUserModalProps) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        status: 'Active' as 'Active' | 'Inactive',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                status: user.status,
            })
        }
    }, [user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;


        const updatedUser: UserWithStats = {
            ...user,
            name: formData.name,
            email: formData.email,
            status: formData.status,
        };

        onSave(updatedUser);
        onOpenChange(false);

    }


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor="status">Status</Label>
                        <Select value={formData.status}
                            onValueChange={(value: 'Active' | 'Inactive') =>
                                setFormData({ ...formData, status: value })
                            }>
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Inactive">Inactive</SelectItem>
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

export default EditUserModal