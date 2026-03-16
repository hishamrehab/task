interface CustomerInfoProps {
    customerName: string;
    paymentMethod?: string;
}

export const CustomerInfo = ({ customerName, paymentMethod = 'Credit Card' }: CustomerInfoProps) => {
    return (
        <div className="p-4 bg-gray-50 dark:bg-white/4 rounded-xl border border-gray-100 dark:border-white/6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <i className="ri-user-line text-teal-600 dark:text-teal-400"></i>
                Customer Information
            </h3>
            <div className="space-y-2">
                <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-slate-400">Name</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-slate-200">{customerName}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-slate-400">Payment Method</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-slate-200">{paymentMethod}</span>
                </div>
            </div>
        </div>
    );
};

export default CustomerInfo