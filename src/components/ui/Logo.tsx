import React from 'react'

const Logo = ({ collapsed }: { collapsed: boolean }) => {
    return (
        <div className="h-16 flex items-center border-b border-gray-100 px-4 flex-shrink-0">
            <div
                className={`flex items-center gap-3 transition-all duration-300 ${collapsed ? 'justify-center w-full' : ''}`}
            >
                <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, rgb(20, 184, 166), rgb(13, 148, 136))' }}
                >
                    <i className="ri-bar-chart-grouped-line text-white text-base"></i>
                </div>
                {!collapsed && (
                    <div className="font-semibold text-gray-800 text-sm whitespace-nowrap">
                        Admin<span className="text-teal-500">Panel</span>
                        <p className="text-xs text-gray-500 dark:text-slate-400 leading-none mt-0.5">Management Suite</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Logo