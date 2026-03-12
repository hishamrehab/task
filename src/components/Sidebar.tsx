import { useEffect } from "react";
import CollapseButton from "./ui/CollapseButton";
import Logo from "./ui/Logo";
import { NavItemComponent } from "./ui";
import type { NavItem, SidebarProps } from "../types";
import MobileMenuButton from "./ui/MobileMenuButton";
import MobileOverlay from "./ui/MobileOverlay";

const Sidebar = ({
    isOpen,
    isCollapsed,
    onClose,
    onToggleCollapse,
    onMobileMenuToggle
}: SidebarProps) => {

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && onClose) {
                onClose();
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [onClose]);


    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const navItems: NavItem[] = [
        { path: '/', icon: 'ri-dashboard-3-line', label: 'Dashboard', title: 'Dashboard' },
        { path: '/users', icon: 'ri-user-3-line', label: 'Users', title: 'Users' },
        { path: '/orders', icon: 'ri-shopping-bag-3-line', label: 'Orders', title: 'Orders' },
        { path: '/analytics', icon: 'ri-bar-chart-2-line', label: 'Analytics', title: 'Analytics' },
        { path: '/settings', icon: 'ri-settings-3-line', label: 'Settings', title: 'Settings' },
    ];


    const bottomNavItems: NavItem[] = [
        { path: '/settings', icon: 'ri-settings-line', label: 'Settings', title: 'Settings' },
        { path: '/help', icon: 'ri-question-line', label: 'Help', title: 'Help' },
        { path: '/profile', icon: 'ri-user-settings-line', label: 'Profile', title: 'Profile' },
    ];




    return (
        <>
            <MobileMenuButton
                onToggle={onMobileMenuToggle}
                isOpen={isOpen}
            />
            <MobileOverlay
                onClose={onClose}
                isOpen={isOpen}
            />
            <aside className={`
                fixed md:static inset-y-0 left-0 z-50
                transform transition-all duration-300 ease-in-out
                flex flex-col bg-white border-r border-gray-200
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                ${isCollapsed ? 'md:w-[72px]' : 'md:w-64'}
                w-64
            `}>
                <CollapseButton
                    isCollapsed={isCollapsed}
                    onToggle={onToggleCollapse}
                />
                <Logo collapsed={isCollapsed} />

                {/* Main Navigation */}
                <nav className="flex-1 px-3 py-4 overflow-y-auto">
                    <div className="space-y-1">
                        {navItems.map((item) => (
                            <NavItemComponent
                                key={item.path}
                                item={item}
                                collapsed={isCollapsed}
                                onClose={onClose}
                            />
                        ))}
                    </div>

                    <div className="my-4 mx-3 border-t border-gray-100"></div>

                    {/* Bottom Navigation */}
                    <div className="space-y-1">
                        {bottomNavItems.map((item) => (
                            <NavItemComponent
                                key={item.path}
                                item={item}
                                collapsed={isCollapsed}
                                onClose={onClose}
                            />
                        ))}
                    </div>
                </nav>

                {/* Mobile User Profile */}
                <div className="md:hidden p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, rgb(20, 184, 166), rgb(13, 148, 136))' }}
                        >
                            <span className="text-white text-sm font-bold">AD</span>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900">Admin User</p>
                            <p className="text-xs text-gray-500">admin@example.com</p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default Sidebar