'use client';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface NavItemProps {
    icon?: LucideIcon;
    label: string;
    href: string;
    active?: boolean;
}

export default function NavItem({
    icon: Icon,
    label,
    href,
    active,
}: NavItemProps) {
    const primaryColor = '#6367FF';

    return (
        <Link
            href={href}
            className={cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group cursor-pointer mb-0.5',
                active
                    ? 'text-white shadow-lg shadow-[#6367FF]/25'
                    : 'text-slate-700 hover:bg-[#6367FF]/5 hover:text-[#6367FF]',
            )}
            style={active ? { backgroundColor: primaryColor } : {}}
        >
            {Icon && (
                <Icon
                    className={cn(
                        'w-5 h-5 shrink-0 transition-colors',
                        active
                            ? 'text-white'
                            : 'text-slate-500 group-hover:text-[#6367FF]',
                    )}
                />
            )}
            <span
                className={cn(
                    'text-[14px] font-medium truncate whitespace-nowrap',
                    active ? 'font-semibold' : '',
                )}
            >
                {label}
            </span>
        </Link>
    );
}