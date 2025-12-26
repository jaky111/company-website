import Link from 'next/link';
import { getSiteConfig } from '@/actions/site-config';

export default async function Header() {
    const siteConfig = await getSiteConfig();

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
                {/* Logo */}
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <span className="text-xl font-bold text-gray-900">
                            {siteConfig.siteName}
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex lg:gap-x-8">
                    <Link
                        href="/"
                        className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors"
                    >
                        首页
                    </Link>
                    <Link
                        href="/about"
                        className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors"
                    >
                        关于我们
                    </Link>
                    <Link
                        href="/products"
                        className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors"
                    >
                        产品中心
                    </Link>
                    <Link
                        href="/news"
                        className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors"
                    >
                        新闻动态
                    </Link>
                    <Link
                        href="/contact"
                        className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors"
                    >
                        联系我们
                    </Link>
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

                {/* Mobile Menu - Simplified */}
                <div className="flex lg:hidden">
                    <Link
                        href="/contact"
                        className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white"
                    >
                        联系
                    </Link>
                </div>
            </nav>
        </header>
    );
}
