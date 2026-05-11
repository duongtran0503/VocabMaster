'use client';
import { cn } from '@/lib/utils';
import { ChevronDown, LucideIcon } from 'lucide-react';
import { useState } from 'react';

interface Props {
    icon: LucideIcon;
    label: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export default function NavItemWithChildmenu({
    icon: Icon,
    label,
    children,
    defaultOpen = false,
}: Props) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const primaryColor = '#6367FF';

    return (
        <div className='py-0.5 group'>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    'w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl transition-all duration-200',
                    'text-slate-700 hover:bg-[#6367FF]/5 hover:text-[#6367FF]',
                    isOpen && 'bg-[#6367FF]/5 text-[#6367FF]',
                )}
            >
                <div className='flex items-center gap-3 min-w-0'>
                    <Icon
                        className={cn(
                            'w-5 h-5 shrink-0 transition-colors',
                            isOpen ? 'text-[#6367FF]' : 'text-slate-500 group-hover:text-[#6367FF]',
                        )}
                    />
                    <span className='text-[14px] font-medium truncate whitespace-nowrap'>
                        {label}
                    </span>
                </div>
                <ChevronDown
                    className={cn(
                        'w-4 h-4 shrink-0 transition-transform duration-300 text-slate-400',
                        isOpen && 'rotate-180 text-[#6367FF]',
                        'group-hover:text-[#6367FF]'
                    )}
                />
            </button>

            <div
                className={cn(
                    'overflow-hidden transition-all duration-300 ease-in-out',
                    isOpen ? 'max-h-125 opacity-100' : 'max-h-0 opacity-0',
                )}
            >
                {/* Đường line dọc bên trái đổi sang màu primary nhẹ */}
                <div className='relative ml-6 pl-4 mt-1 space-y-1 border-l-2 border-slate-100 group-hover:border-[#6367FF]/20 transition-colors'>
                    {children}
                </div>
            </div>
        </div>
    );
}