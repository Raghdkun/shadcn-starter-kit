import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="flex flex-1 flex-col overflow-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                <div className="flex-1 overflow-auto">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}