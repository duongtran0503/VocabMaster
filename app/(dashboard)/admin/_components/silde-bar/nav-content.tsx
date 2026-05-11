import {
    BarChart3,
    BookOpen,
    FileText,
    LayoutDashboard,
    Library,
    LucideIcon,
    Settings,
    Users
} from 'lucide-react';

interface NavItemChild {
    label: string;
    href: string;
}

interface NavItemType {
    id: string;
    label: string;
    icon: LucideIcon;
    href: string;
    children?: NavItemChild[];
}

export const ADMIN_NAV_ITEMS: NavItemType[] = [
    {
        id: 'dashboard',
        label: 'Tổng quan',
        icon: LayoutDashboard,
        href: '/admin',
    },
    {
        id: 'topics',
        label: 'Quản lý Chủ đề',
        icon: Library,
        href: '/admin/topics',
        children: [
            { label: 'Danh sách chủ đề', href: '/admin/topics' },
            { label: 'Cấp độ học (Levels)', href: '/admin/topics/levels' },
        ],
    },
    {
        id: 'vocabs',
        label: 'Kho Từ vựng',
        icon: BookOpen,
        href: '/admin/vocabs',
        children: [
            { label: 'Tất cả từ vựng', href: '/admin/vocabs' },
            { label: 'Duyệt từ đóng góp', href: '/admin/vocabs/pending' },
            { label: 'Kiểm tra lỗi (Fix)', href: '/admin/vocabs/audit' },
        ],
    },
    {
        id: 'users',
        label: 'Người học',
        icon: Users,
        href: '/admin/users',
        children: [
            { label: 'Danh sách User', href: '/admin/users' },
            { label: 'Tiến độ học tập', href: '/admin/users/progress' },
        ],
    },
    {
        id: 'exams',
        label: 'Bài kiểm tra từ vựng',
        icon: FileText,
        href: '/admin/test-vocabs',
        // Chức năng: Quản lý các bộ đề thi thử 
    },
    {
        id: 'analytics',
        label: 'Báo cáo & Thống kê',
        icon: BarChart3,
        href: '/admin/analytics',
    },
    {
        id: 'settings',
        label: 'Cấu hình hệ thống',
        icon: Settings,
        href: '/admin/settings',
    },
];