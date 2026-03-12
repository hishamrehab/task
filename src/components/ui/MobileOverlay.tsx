interface MobileOverlayProps {
    onClose: () => void;
    isOpen: boolean;
}

const MobileOverlay = ({ onClose, isOpen }: MobileOverlayProps) => (
    <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
    />
);

export default MobileOverlay;