import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem } from '@/types';

interface AppSidebarHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
}

export function AppSidebarHeader({ breadcrumbs = [] }: AppSidebarHeaderProps) {
    return (
        <div className="border-b bg-background px-6 py-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
        </div>
    );
}