import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router';

export default function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        if (window.innerWidth < 768) {
            setIsSidebarOpen(!isSidebarOpen);
        } else {
            setIsSidebarCollapsed(!isSidebarCollapsed);
        }
    };

    const handleMobileMenuToggle = (value: boolean) => {
        setIsSidebarOpen(value);
    }

    const handleCloseMobileMenu = () => {
        setIsSidebarOpen(false);
    }

    const handleToggleCollapse = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    }


    return (
        <div className="flex h-screen bg-gray-50 text-gray-900">
            <Sidebar
                isOpen={isSidebarOpen}
                isCollapsed={isSidebarCollapsed}
                onClose={handleCloseMobileMenu}
                onToggleCollapse={handleToggleCollapse}
                onMobileMenuToggle={handleMobileMenuToggle}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header
                    toggleSidebar={toggleSidebar}
                    isSidebarCollapsed={isSidebarCollapsed}
                />
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}