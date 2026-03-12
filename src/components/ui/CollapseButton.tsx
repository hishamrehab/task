interface CollapseButtonProps {
    isCollapsed: boolean;
    onToggle: () => void;
}

const CollapseButton = ({ isCollapsed, onToggle }: CollapseButtonProps) => {
    return (
        <button
            onClick={onToggle}
            className="hidden md:flex absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full items-center justify-center text-gray-500 hover:text-teal-500 hover:border-teal-200 shadow-sm transition-all z-10"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
            <i className={`ri-arrow-left-s-line text-sm transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}></i>
        </button>
    );
};

export default CollapseButton;