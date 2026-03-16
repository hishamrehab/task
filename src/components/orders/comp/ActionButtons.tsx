interface ActionButtonsProps {
    onPrint: () => void;
    onEmail: () => void;
}

export const ActionButtons = ({ onPrint, onEmail }: ActionButtonsProps) => {
    return (
        <div className="flex gap-3 pt-4">
            <button
                onClick={onPrint}
                className="flex-1 px-4 py-2.5 bg-teal-500 text-white text-sm font-medium rounded-lg hover:bg-teal-600 transition-colors whitespace-nowrap "
            >
                <i className="ri-printer-line mr-2"></i>
                Print Invoice
            </button>
            <button
                onClick={onEmail}
                className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-colors whitespace-nowrap"
            >
                <i className="ri-mail-line mr-2"></i>
                Email Customer
            </button>
        </div>
    );
};

export default ActionButtons
