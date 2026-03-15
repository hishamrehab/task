import { Eye, Edit, Trash2 } from 'lucide-react';
import type { UserWithStats } from '../../types';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';



interface UserRowProps {
    user: UserWithStats;
    onView: (user: UserWithStats) => void;
    onEdit: (user: UserWithStats) => void;
    onDelete: (user: UserWithStats) => void;
}

const UserRow = ({ user, onView, onEdit, onDelete }: UserRowProps) => {
    const avatarUrl = user.imgUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user.name
    )}&background=random&color=fff&size=40&font-size=0.33&length=2`;

    return (
        <tr className="border-b border-border/50 hover:bg-muted/50 transition-colors">
            <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-border">
                        <img
                            src={avatarUrl}
                            alt={user.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff&size=40`;
                            }}
                        />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                </div>
            </td>
            <td className="py-4 px-4">
                <Badge
                    variant={user.role === 'Premium' ? 'default' : 'secondary'}
                    className={cn(
                        "rounded-lg px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold",
                        user.role === 'Premium' 
                            ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20' 
                            : 'bg-muted text-muted-foreground'
                    )}
                >
                    {user.role}
                </Badge>
            </td>
            <td className="py-4 px-4">
                <Badge
                    variant="secondary"
                    className={cn(
                        "inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold",
                        user.status === 'Active'
                            ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20'
                            : 'bg-muted text-muted-foreground'
                    )}
                >
                    <span className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        user.status === 'Active' ? 'bg-green-600' : 'bg-muted-foreground'
                    )} />
                    {user.status}
                </Badge>
            </td>
            <td className="py-4 px-4 text-right text-sm text-muted-foreground">
                {user.ordersCount}
            </td>
            <td className="py-4 px-4 text-right text-sm font-semibold text-foreground">
                ${user.totalSpent.toFixed(2)}
            </td>
            <td className="py-4 px-4">
                <div className="flex items-center justify-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onView(user)}
                        className="p-2 hover:bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-lg h-8 w-8"
                        title="View Details"
                    >
                        <Eye className="w-5 h-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(user)}
                        className="p-2 hover:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-lg h-8 w-8"
                        title="Edit User"
                    >
                        <Edit className="w-5 h-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(user)}
                        className="p-2 hover:bg-destructive/10 text-destructive rounded-lg h-8 w-8"
                        title="Delete User"
                    >
                        <Trash2 className="w-5 h-5" />
                    </Button>
                </div>
            </td>
        </tr>
    );
};

export default UserRow;