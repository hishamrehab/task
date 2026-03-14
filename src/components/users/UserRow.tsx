import { Eye, Edit, Trash2 } from 'lucide-react';
import type { UserWithStats } from '../../types';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';



interface UserRowProps {
    user: UserWithStats;
    onView: (user: UserWithStats) => void;
    onEdit: (user: UserWithStats) => void;
    onDelete: (user: UserWithStats) => void;
}

const UserRow = ({ user, onView, onEdit, onDelete }: UserRowProps) => {
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user.name
    )}&background=random&color=fff&size=40&font-size=0.33&length=2`;

    return (
        <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                        <img
                            src={avatarUrl}
                            alt={user.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                // Fallback to a default avatar if the image fails to load
                                (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=User&background=random&color=fff&size=40';
                            }}
                        />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                </div>
            </td>
            <td className="py-4 px-4">
                <Badge
                    variant={user.role === 'Premium' ? 'default' : 'secondary'}
                    className={user.role === 'Premium' ? 'bg-purple-50 text-purple-600 hover:bg-purple-100' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                >
                    {user.role}
                </Badge>
            </td>
            <td className="py-4 px-4">
                <Badge
                    variant={user.status === 'Active' ? 'success' : 'secondary'}
                    className={`inline-flex items-center gap-1 ${user.status === 'Active'
                        ? 'bg-green-50 text-green-600'
                        : 'bg-gray-100 text-gray-600'
                        }`}
                >
                    <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-600' : 'bg-gray-600'}`} />
                    {user.status}
                </Badge>
            </td>
            <td className="py-4 px-4 text-right text-sm text-gray-600">
                {user.ordersCount}
            </td>
            <td className="py-4 px-4 text-right text-sm font-semibold text-gray-900">
                ${user.totalSpent.toFixed(2)}
            </td>
            <td className="py-4 px-4">
                <div className="flex items-center justify-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onView(user)}
                        className="p-2 hover:bg-teal-50 text-teal-600 rounded-lg"
                        title="View Details"
                    >
                        <Eye className="w-5 h-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(user)}
                        className="p-2 hover:bg-orange-50 text-orange-600 rounded-lg"
                        title="Edit User"
                    >
                        <Edit className="w-5 h-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(user)}
                        className="p-2 hover:bg-red-50 text-red-600 rounded-lg"
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