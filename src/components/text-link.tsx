import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { type ComponentProps } from 'react';

interface TextLinkProps extends ComponentProps<typeof Link> {
    variant?: 'default' | 'muted';
}

export function TextLink({ 
    className, 
    variant = 'default',
    ...props 
}: TextLinkProps) {
    return (
        <Link
            className={cn(
                'font-medium underline underline-offset-4 transition-colors hover:text-primary',
                variant === 'default' && 'text-primary',
                variant === 'muted' && 'text-muted-foreground hover:text-foreground',
                className
            )}
            {...props}
        />
    );
}