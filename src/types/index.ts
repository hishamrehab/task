export interface NavItem {
    path: string;
    icon: string;
    label: string;
    title: string;
}

export interface SidebarProps {
    isOpen: boolean;
    isCollapsed: boolean;
    onClose: () => void;
    onToggleCollapse: () => void;
    onMobileMenuToggle: (value: boolean) => void;
}

export interface HeaderProps {
    toggleSidebar: () => void;
    isSidebarCollapsed: boolean;
}

// UI Component Props
export interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    icon?: string;
    iconPosition?: 'left' | 'right';
    className?: string;
    disabled?: boolean;
    ariaLabel?: string;
}