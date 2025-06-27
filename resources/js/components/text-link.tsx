import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { ComponentProps } from 'react';

type LinkProps = ComponentProps<typeof Link>;

export default function TextLink({ className = '', children, ...props }: LinkProps) {
    return (
        <Link
            className={cn(
                'text-blue-600 dark:text-blue-600 underline decoration-gray-300 dark:decoration-gray-600 underline-offset-4 transition-colors duration-300 ease-out hover:text-blue-800 dark:hover:text-blue-800 hover:decoration-current',
                className,
            )}
            {...props}
        >
            {children}
        </Link>
    );
}
