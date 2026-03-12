import { NavLink } from "react-router";
import type { NavItem } from "../../types";


interface NavItemComponentProps {
    item: NavItem;
    collapsed: boolean;
    onClose: () => void;
}


const NavItemComponent = ({ item, collapsed, onClose }: NavItemComponentProps) => (
    <NavLink
        to={item.path}
        className={({ isActive }) => `
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                whitespace-nowrap group relative
                ${isActive
                ? 'text-gray-900'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }
            `}
        style={({ isActive }) => isActive ? {
            background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.25), rgba(20, 184, 166, 0.1))',
            border: '1px solid rgba(20, 184, 166, 0.3)'
        } : undefined}
        title={item.title}
        onClick={onClose}
    >
        {({ isActive }) => (
            <>
                {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-teal-400"></span>
                )}
                <i className={`${item.icon} text-lg flex items-center justify-center w-5 h-5 flex-shrink-0 
                        ${isActive ? 'text-teal-400' : 'text-gray-500 group-hover:text-gray-700'}`}
                />
                {!collapsed && (
                    <span className="text-sm font-medium transition-opacity duration-300">
                        {item.label}
                    </span>
                )}
                {collapsed && (
                    <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity z-50">
                        {item.label}
                    </span>
                )}
            </>
        )}
    </NavLink>
);

export default NavItemComponent