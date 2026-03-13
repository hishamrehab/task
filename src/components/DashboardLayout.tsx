import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router';

export default function DashboardLayout() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        if (window.innerWidth >= 1024) {
            setIsCollapsed(false);
        } else if (window.innerWidth >= 768) {
            setIsCollapsed(true);
        }
    }, []);

    const toggleSidebar = () => {
        if (window.innerWidth < 768) {

            setIsSidebarOpen(prev => !prev);
        } else {
            setIsCollapsed(prev => !prev);
        }
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white overflow-hidden">
            <Sidebar
                isOpen={isSidebarOpen}
                isCollapsed={isCollapsed}
                onClose={closeSidebar}
            />
            <div className="flex-1 flex flex-col overflow-hidden min-w-0">
                <Header
                    toggleSidebar={toggleSidebar}
                    isCollapsed={isCollapsed}
                />
                <main className="flex-1 overflow-y-auto p-4 sm:p-5 md:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}