'use client';
import { ADMIN_NAV_ITEMS } from '@/app/(dashboard)/admin/_components/silde-bar/nav-content';
import NavItem from '@/app/(dashboard)/admin/_components/silde-bar/nav-item';
import NavItemWithChildmenu from '@/app/(dashboard)/admin/_components/silde-bar/nav-item-with-child';
import { LogOut, GraduationCap } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const pathName = usePathname();
    const primaryColor = '#6367FF';

    return (
        <div className='w-66 fixed left-0 bottom-0 top-0 bg-white border-r border-gray-100 shadow-sm'>
            <div className='flex flex-col h-full justify-between'>
                {/* Logo Section */}
                <div className='p-6 mb-2'>
                    <div className='flex items-center gap-3'>
                        <div 
                            className='w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-[#6367FF]/20'
                            style={{ backgroundColor: primaryColor }}
                        >
                            <GraduationCap className='w-6 h-6 text-white' />
                        </div>
                        <h1 className='text-xl font-bold tracking-tight text-slate-800'>
                            Vocab<span style={{ color: primaryColor }}>Master</span>
                        </h1>
                    </div>
                </div>

                {/* Navigation */}
                <div className='overflow-y-auto h-full px-4 scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-[#6367FF]/20'>
                    <nav className='flex-1 space-y-1 pb-10'>
                        {ADMIN_NAV_ITEMS.map((item) => {
                            if (item.children) {
                                const open = item.children.some((child) =>
                                    pathName.startsWith(child.href),
                                );
                                return (
                                    <NavItemWithChildmenu
                                        key={item.id}
                                        icon={item.icon}
                                        label={item.label}
                                        defaultOpen={open}
                                    >
                                        {item.children.map((child) => (
                                            <NavItem
                                                key={child.href}
                                                label={child.label}
                                                href={child.href}
                                                active={pathName === child.href}
                                            />
                                        ))}
                                    </NavItemWithChildmenu>
                                );
                            } else {
                                return (
                                    <NavItem
                                        key={item.id}
                                        icon={item.icon}
                                        label={item.label}
                                        href={item.href}
                                        active={item.href === pathName}
                                    />
                                );
                            }
                        })}
                    </nav>
                </div>

                {/* Logout Button */}
                <div className='p-4 border-t border-gray-50'>
                    <button className='w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-[#6367FF] hover:bg-[#6367FF]/5 rounded-xl transition-all duration-200 group'>
                        <LogOut className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
                        <span className='text-sm font-semibold'>Đăng xuất</span>
                    </button>
                </div>
            </div>
        </div>
    );
}