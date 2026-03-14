import { useState } from "react"
import {
    Menu,
    PanelLeftClose,
    PanelLeftOpen,
    Search,
    Moon,
    Sun,
    Bell,
    ChevronDown,
    ChevronRight,
    LayoutDashboard,
} from "lucide-react"
import type { HeaderProps } from "../types"


const Header = ({ toggleSidebar, isCollapsed }: HeaderProps) => {
    const [isDark, setIsDark] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    const toggleTheme = () => {
        setIsDark(prev => !prev)
        document.documentElement.classList.toggle("dark")
    }

    return (
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 flex-shrink-0 sticky top-0 z-30 border-b bg-white dark:bg-slate-900 border-gray-100 dark:border-white/6 shadow-sm dark:shadow-none">

            {/* ── Left section ── */}
            <div className="flex items-center gap-3 min-w-0">

                {/* Hamburger / collapse toggle */}
                <button
                    onClick={toggleSidebar}
                    className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/8 transition-all flex-shrink-0"
                    aria-label="Toggle sidebar"
                >
                    {/* Mobile: always show Menu. Tablet/Desktop: show panel open/close */}
                    <span className="md:hidden"><Menu className="w-5 h-5" /></span>
                    <span className="hidden md:block">
                        {isCollapsed
                            ? <PanelLeftOpen className="w-5 h-5" />
                            : <PanelLeftClose className="w-5 h-5" />
                        }
                    </span>
                </button>

                {/* Breadcrumb — hide "Admin >" on very small screens */}
                <div className="flex items-center gap-1.5 sm:gap-2 text-sm min-w-0">
                    <span className="hidden sm:block text-gray-400 dark:text-slate-600 text-xs flex-shrink-0">Admin</span>
                    <ChevronRight className="hidden sm:block w-4 h-4 text-gray-300 dark:text-slate-700 flex-shrink-0" />
                    <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 rounded-lg bg-teal-500/15 flex items-center justify-center flex-shrink-0">
                            <LayoutDashboard className="w-3.5 h-3.5 text-teal-400" />
                        </div>
                        <div className="min-w-0">
                            <span className="font-semibold text-gray-900 dark:text-white text-sm whitespace-nowrap">Dashboard</span>
                            <span className="hidden lg:inline text-gray-500 dark:text-slate-500 text-xs ml-1.5 whitespace-nowrap">— Overview &amp; analytics</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Right section ── */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">

                {/* Mobile search button (icon only) */}
                <button
                    onClick={() => setIsSearchOpen(prev => !prev)}
                    className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/8 transition-all"
                    aria-label="Search"
                >
                    <Search className="w-5 h-5" />
                </button>

                {/* Desktop search bar */}
                <div className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm cursor-pointer transition-all group border bg-gray-50 dark:bg-white/4 border-gray-200 dark:border-white/8 hover:border-gray-300 dark:hover:border-white/12">
                    <Search className="w-4 h-4 text-gray-400 dark:text-slate-500 group-hover:text-gray-600 dark:group-hover:text-slate-300 transition-colors flex-shrink-0" />
                    <span className="text-xs text-gray-500 dark:text-slate-500 hidden lg:block">Search anything...</span>
                    <span className="hidden xl:block ml-3 text-xs border px-1.5 py-0.5 rounded-md font-mono bg-white dark:bg-white/6 border-gray-200 dark:border-white/10 text-gray-500 dark:text-slate-500">⌘K</span>
                </div>

                {/* Theme toggle */}
                <button
                    onClick={toggleTheme}
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-slate-400"
                    aria-label="Toggle theme"
                >
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                {/* Notifications */}
                <div className="relative">
                    <button
                        className="relative w-9 h-9 flex items-center justify-center rounded-xl transition-all text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/8"
                        aria-label="Notifications"
                    >
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900" />
                    </button>
                </div>

                {/* Divider — hidden on mobile */}
                <div className="hidden sm:block w-px h-6 mx-1 bg-gray-200 dark:bg-white/8 flex-shrink-0" />

                {/* User avatar */}
                <div className="flex items-center gap-2 cursor-pointer group px-2 py-1.5 rounded-xl transition-all hover:bg-gray-50 dark:hover:bg-white/5">
                    <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, rgb(20, 184, 166), rgb(13, 148, 136))" }}
                    >
                        <span className="text-white text-xs font-bold">AD</span>
                    </div>
                    <div className="hidden sm:block">
                        <p className="text-xs font-semibold text-gray-900 dark:text-white leading-tight whitespace-nowrap">Admin User</p>
                        <p className="text-xs text-gray-500 dark:text-slate-500 leading-tight whitespace-nowrap">Super Admin</p>
                    </div>
                </div>
            </div>

            {/* ── Mobile search dropdown ── */}
            {isSearchOpen && (
                <div className="absolute top-16 left-0 right-0 z-50 md:hidden px-4 pb-3 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-white/5 shadow-lg">
                    <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl border bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10">
                        <Search className="w-4 h-4 text-gray-400 dark:text-slate-500 flex-shrink-0" />
                        <input
                            autoFocus
                            type="text"
                            placeholder="Search anything..."
                            className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 outline-none"
                        />
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header