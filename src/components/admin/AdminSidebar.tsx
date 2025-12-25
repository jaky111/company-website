'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
    LayoutDashboard,
    Package,
    FileText,
    MessageSquare,
    Home,
    LogOut
} from 'lucide-react';

const navigation = [
    { name: '仪表盘', href: '/admin', icon: LayoutDashboard },
    { name: '产品管理', href: '/admin/products', icon: Package },
    { name: '文章管理', href: '/admin/posts', icon: FileText },
    { name: '线索留言', href: '/admin/inquiries', icon: MessageSquare },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    async function handleLogout() {
        await signOut({ callbackUrl: '/' });
    }

    return (
        <div className="w-64 bg-gray-900 text-white flex flex-col h-screen fixed left-0 top-0">
            {/* Logo */}
            <div className="p-6 border-b border-gray-800">
                <h1 className="text-xl font-bold">Enterprise Admin</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                }`}
                        >
                            <Icon className="h-5 w-5" />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-gray-800 space-y-2">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                >
                    <LogOut className="h-5 w-5" />
                    <span>退出登录</span>
                </button>
                <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                >
                    <Home className="h-5 w-5" />
                    <span>返回前台</span>
                </Link>
            </div>
        </div>
    );
}
