import type { HeaderProps } from '../types'
import Button from './ui/Button'

const Header = ({ toggleSidebar, isSidebarCollapsed }: HeaderProps) => {


    return (
        <header className="h-16 flex items-center 
        justify-between px-4 md:px-6 flex-shrink-0
         sticky top-0 z-30 border-b bg-white border-gray-100 shadow-sm">
            {/* Left section */}
            <div className="flex items-center gap-2 md:gap-4 min-w-0">
                <Button
                    onClick={toggleSidebar}
                    icon={isSidebarCollapsed ? 'ri-menu-unfold-line' : 'ri-menu-fold-line'}
                    ariaLabel="Toggle menu"
                    variant="ghost"
                />
                <Breadcrumb />
            </div>

        </header>
    )
}

export default Header