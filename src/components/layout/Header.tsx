'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navigation = [
    { name: '首页', href: '/' },
    { name: '关于我们', href: '/about' },
    { name: '产品中心', href: '/products' },
    { name: '新闻动态', href: '/news' },
    { name: '联系我们', href: '/contact' },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
                {/* Logo */}
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <span className="text-xl font-bold text-gray-900">Enterprise Demo</span>
                    </Link>
                </div>

                {/* Mobile menu button */}
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <span className="sr-only">打开主菜单</span>
                        {mobileMenuOpen ? (
                            <X className="h-6 w-6" aria-hidden="true" />
                        ) : (
                            <Menu className="h-6 w-6" aria-hidden="true" />
                        )}
                    </button>
                </div>

                {/* Desktop navigation */}
                <div className="hidden lg:flex lg:gap-x-8">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Link
                        href="/contact"
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
                    >
                        联系我们
                    </Link>
                </div>
            </nav>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden">
                    <div className="space-y-1 px-4 pb-3 pt-2">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            className="block rounded-md bg-blue-600 px-3 py-2 text-base font-semibold text-white hover:bg-blue-500 transition-colors text-center mt-4"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            联系我们
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
