import { DialogTitle } from "@/components/ui/dialog";

interface ModalHeaderProps {
    orderId: string;
    onClose: () => void;
}

export function ModalHeader({ orderId, onClose }: ModalHeaderProps) {
    return (
        <div className="relative p-6 bg-gray-50 dark:bg-slate-800 border-b border-gray-100 dark:border-white/6">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-white dark:bg-white/5 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-all z-10"
            >
                <i className="ri-close-line text-xl"></i>
            </button>
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-500/10 flex items-center justify-center">
                    <i className="ri-shopping-bag-3-line text-2xl text-teal-600 dark:text-teal-400"></i>
                </div>
                <div>
                    <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
                        Order Details
                    </DialogTitle>
                    <p className="text-sm text-gray-500 dark:text-slate-400 font-mono uppercase">
                        {orderId}
                    </p>
                </div>
            </div>
        </div>
    );
}