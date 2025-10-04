import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useInitials } from '@/hooks/use-initials';
import { type BreadcrumbItem } from '@/types';
import { Menu, Search, User, Settings, LogOut } from 'lucide-react';

interface AppHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
}

export function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
    const getInitials = useInitials();
    
    // Mock user data for now
    const user = {
        name: 'John Doe',
        email: 'john@example.com',
        avatar: undefined,
    };

    return (
        <>
            <div className="border-b">
                <div className="mx-auto flex h-16 items-center px-4 md:max-w-7xl">
                    {/* Mobile Menu */}
                    <div className="lg:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="mr-2 h-[34px] w-[34px]"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-primary-foreground">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                            </svg>
                        </div>
                        <h1 className="text-lg font-semibold">App Name</h1>
                    </div>

                    {/* Navigation items would go here */}
                    <div className="ml-6 hidden h-full items-center space-x-6 lg:flex">
                        {/* Navigation menu items */}
                    </div>

                    <div className="ml-auto flex items-center space-x-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="group h-9 w-9 cursor-pointer"
                        >
                            <Search className="h-5 w-5 opacity-80 group-hover:opacity-100" />
                        </Button>
                        
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="size-10 rounded-full p-1"
                                >
                                    <Avatar className="size-8 overflow-hidden rounded-full">
                                        <AvatarImage
                                            src={user.avatar}
                                            alt={user.name}
                                        />
                                        <AvatarFallback className="rounded-lg bg-muted">
                                            {getInitials(user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end">
                                <div className="flex items-center justify-start gap-2 p-2">
                                    <div className="flex flex-col space-y-1 leading-none">
                                        <p className="font-medium">{user.name}</p>
                                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <User className="mr-2 h-4 w-4" />
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    Settings
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
            {breadcrumbs.length > 1 && (
                <div className="flex w-full border-b">
                    <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-muted-foreground md:max-w-7xl">
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="flex items-center space-x-2">
                                {breadcrumbs.map((breadcrumb, index) => (
                                    <li key={index} className="flex items-center">
                                        {index > 0 && (
                                            <span className="mx-2 text-muted-foreground">/</span>
                                        )}
                                        {breadcrumb.href ? (
                                            <a
                                                href={breadcrumb.href}
                                                className="text-sm text-muted-foreground hover:text-foreground"
                                            >
                                                {breadcrumb.title}
                                            </a>
                                        ) : (
                                            <span className="text-sm font-medium">
                                                {breadcrumb.title}
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ol>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}