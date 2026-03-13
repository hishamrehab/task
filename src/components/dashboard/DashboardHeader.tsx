import { Calendar } from 'lucide-react';

const DashboardHeader = () => {
    return (
        <div className="flex items-start justify-between">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                    Good morning, Admin 👋
                </h1>
                <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
                    Here's what's happening with your platform today.
                </p>
            </div>
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm border bg-white dark:bg-white/5 border-gray-200 dark:border-white/10">
                    <Calendar className="w-4 h-4 text-gray-400 dark:text-slate-400" />
                    <span className="text-xs font-medium text-gray-700 dark:text-slate-300">
                        Dec 2024
                    </span>
                </div>
                <div
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl"
                    style={{
                        background: 'linear-gradient(135deg, rgb(20, 184, 166), rgb(13, 148, 136))',
                    }}
                >
                    <span className="w-2 h-2 rounded-full bg-white/70 animate-pulse"></span>
                    <span className="text-xs font-semibold text-white">Live</span>
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;