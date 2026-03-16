interface ProductInfoProps {
    product: string;
    orderDate: string;
}

export const ProductInfo = ({ product, orderDate }: ProductInfoProps) => {
    return (
        <div className="p-4 bg-gray-50 dark:bg-white/4 rounded-xl border border-gray-100 dark:border-white/6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <i className="ri-shopping-cart-line text-teal-600 dark:text-teal-400"></i>
                Product Details
            </h3>
            <div className="space-y-2">
                <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-slate-400">Product</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-slate-200">{product}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-slate-400">Order Date</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-slate-200">{orderDate}</span>
                </div>
            </div>
        </div>
    );
};