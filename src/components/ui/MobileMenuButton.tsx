interface MobileMenuButtonProps {
    onToggle: (value: boolean) => void;
    isOpen: boolean;
}

const MobileMenuButton = ({ onToggle, isOpen }: MobileMenuButtonProps) => {
    return (
        <button
            onClick={() => onToggle(!isOpen)}
            className="fixed top-4 left-4 z-50 md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all"
            aria-label="Toggle mobile menu"
        >
            <i className={`${isOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`}></i>
        </button>
    );
};

export default MobileMenuButton;