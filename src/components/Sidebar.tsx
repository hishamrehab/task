import { useEffect } from "react"
import { NavLink } from "react-router"
import {
    LayoutDashboard,
    Users,
    ShoppingBag,
    Settings,
    HelpCircle,
    MoreHorizontal,
    BarChart2,
} from "lucide-react"
import type { SidebarProps } from "../../types"

interface NavItemConfig {
    path: string
    icon: React.ElementType
    label: string
    badge?: string | number
}

const mainNavItems: NavItemConfig[] = [
    { path: "/", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/users", icon: Users, label: "Users", badge: 156 },
    { path: "/orders", icon: ShoppingBag, label: "Orders", badge: 12 },
    { path: "/analytics", icon: BarChart2, label: "Analytics" },
]

const bottomNavItems: NavItemConfig[] = [
    { path: "/settings", icon: Settings, label: "Settings" },
    { path: "/help", icon: HelpCircle, label: "Help & Support" },
]

const Sidebar = ({ isOpen, isCollapsed, onClose }: SidebarProps) => {

    useEffect(() => {
        if (window.innerWidth < 768) {
            document.body.style.overflow = isOpen ? "hidden" : "unset"
        }
        return () => { document.body.style.overflow = "unset" }
    }, [isOpen])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) onClose()
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [onClose])

    const handleNavClick = () => {
        if (window.innerWidth < 768) onClose()
    }

    return (
        <>
            {/* Mobile overlay backdrop */}
            <div
                className={`
                    fixed inset-0 z-40 bg-black/40 backdrop-blur-sm
                    transition-opacity duration-300
                    md:hidden
                    ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
                `}
                onClick={onClose}
            />

            <aside
                className={`
                    fixed md:static inset-y-0 left-0 z-50
                    flex-shrink-0 flex flex-col
                    bg-white dark:bg-slate-900
                    border-r border-gray-100 dark:border-white/5
                    transition-all duration-300 ease-in-out
                    overflow-hidden
                    /* Mobile: slide in/out */
                    ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                    /* Width: mobile always 72, tablet/desktop dynamic */
                    w-64 md:w-auto
                    ${isCollapsed ? "md:w-[72px]" : "md:w-64"}
                `}
            >

                <div className={`
                    h-16 flex items-center border-b border-gray-100 dark:border-white/5
                    flex-shrink-0 transition-all duration-300
                    ${isCollapsed ? "px-0 justify-center" : "px-4"}
                `}>
                    <div className={`flex items-center gap-3 ${isCollapsed ? "justify-center w-full" : ""}`}>
                        <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: "linear-gradient(135deg, rgb(20, 184, 166), rgb(13, 148, 136))" }}
                        >
                            <BarChart2 className="text-white w-5 h-5" />
                        </div>
                        {!isCollapsed && (
                            <div className="overflow-hidden">
                                <span className="text-sm font-bold text-gray-900 dark:text-white whitespace-nowrap tracking-tight">AdminPanel</span>
                                <p className="text-xs text-gray-500 dark:text-slate-400 leading-none mt-0.5 whitespace-nowrap">Management Suite</p>
                            </div>
                        )}
                    </div>
                </div>


                <div className={`transition-all duration-300 ${isCollapsed ? "px-2 pt-4 pb-1" : "px-4 pt-5 pb-2"}`}>
                    {isCollapsed
                        ? <div className="w-full h-px bg-gray-100 dark:bg-white/5" />
                        : <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Main Menu</p>
                    }
                </div>

                {/*  Top nav  */}
                <nav className={`flex-1 py-2 space-y-1 overflow-y-auto overflow-x-hidden transition-all duration-300 ${isCollapsed ? "px-2" : "px-3"}`}>
                    {mainNavItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === "/"}
                            onClick={handleNavClick}
                            title={isCollapsed ? item.label : undefined}
                            className={({ isActive }) =>
                                `w-full flex items-center gap-3 rounded-xl transition-all duration-200 whitespace-nowrap group relative
                                ${isCollapsed ? "justify-center px-0 py-2.5" : "px-3 py-2.5"}
                                ${isActive
                                    ? "text-gray-900 dark:text-white"
                                    : "text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5"
                                }`
                            }
                            style={({ isActive }) =>
                                isActive
                                    ? {
                                        background: "linear-gradient(135deg, rgba(20, 184, 166, 0.25), rgba(20, 184, 166, 0.1))",
                                        border: "1px solid rgba(20, 184, 166, 0.3)",
                                    }
                                    : {}
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {isActive && !isCollapsed && (
                                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-teal-400" />
                                    )}
                                    <div className="relative flex-shrink-0">
                                        <item.icon className={`w-5 h-5 ${isActive ? "text-teal-400" : ""}`} />
                                        {/* Badge dot in collapsed mode */}
                                        {isCollapsed && item.badge !== undefined && (
                                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-teal-400 rounded-full" />
                                        )}
                                    </div>
                                    {!isCollapsed && (
                                        <>
                                            <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
                                            {item.badge !== undefined && (
                                                <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-slate-400">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>


                <div className="mx-3 border-t border-gray-100 dark:border-white/5" />

                {/*  Bottom nav  */}
                <div className={`py-4 space-y-1 transition-all duration-300 ${isCollapsed ? "px-2" : "px-3"}`}>
                    {bottomNavItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={handleNavClick}
                            title={isCollapsed ? item.label : undefined}
                            className={({ isActive }) =>
                                `w-full flex items-center gap-3 rounded-xl transition-all whitespace-nowrap
                                ${isCollapsed ? "justify-center px-0 py-2.5" : "px-3 py-2.5"}
                                ${isActive
                                    ? "text-teal-500 dark:text-teal-400 bg-teal-50 dark:bg-teal-400/10"
                                    : "text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5"
                                }`
                            }
                        >
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                        </NavLink>
                    ))}


                    {isCollapsed ? (

                        <div className="flex justify-center pt-2">
                            <div
                                className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                                style={{ background: "linear-gradient(135deg, rgb(20, 184, 166), rgb(13, 148, 136))" }}
                                title="Admin User"
                            >
                                <span className="text-white text-xs font-bold">AD</span>
                            </div>
                        </div>
                    ) : (

                        <div className="flex items-center gap-3 px-3 py-3 mt-1 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-all border border-gray-100 dark:border-white/7">
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                                style={{ background: "linear-gradient(135deg, rgb(20, 184, 166), rgb(13, 148, 136))" }}
                            >
                                <span className="text-white text-xs font-bold">AD</span>
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">Admin User</p>
                                <p className="text-xs text-gray-500 dark:text-slate-500 truncate">admin@panel.com</p>
                            </div>
                            <MoreHorizontal className="w-4 h-4 text-gray-400 dark:text-slate-500 flex-shrink-0" />
                        </div>
                    )}
                </div>
            </aside>
        </>
    )
}

export default Sidebar