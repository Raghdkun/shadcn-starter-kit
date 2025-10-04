import AppSidebarLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

export interface AppLayoutProps {
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({
    children,
    breadcrumbs,
}: PropsWithChildren<AppLayoutProps>) {
    return (
        <AppSidebarLayoutTemplate breadcrumbs={breadcrumbs}>
            {children}
        </AppSidebarLayoutTemplate>
    );
}