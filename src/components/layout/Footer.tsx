import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
    company: [
        { name: '关于我们', href: '/about' },
        { name: '发展历程', href: '/about#history' },
        { name: '团队介绍', href: '/about#team' },
        { name: '荣誉资质', href: '/about#honors' },
    ],
    products: [
        { name: '产品中心', href: '/products' },
        { name: '解决方案', href: '/products#solutions' },
        { name: '成功案例', href: '/cases' },
        { name: '下载中心', href: '/downloads' },
    ],
    resources: [
        { name: '新闻动态', href: '/news' },
        { name: '行业资讯', href: '/news?type=industry' },
        { name: '人才招聘', href: '/careers' },
        { name: '联系我们', href: '/contact' },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Enterprise Demo</h3>
                        <p className="text-sm leading-6">
                            致力于为企业提供全方位的数字化转型解决方案,
                            助力企业实现业务创新与效率提升。
                        </p>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-white mb-4">公司信息</h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm hover:text-white transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-white mb-4">产品与服务</h3>
                        <ul className="space-y-2">
                            {footerLinks.products.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm hover:text-white transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-sm font-semibold text-white mb-4">联系方式</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                <span className="text-sm">北京市朝阳区XX大厦XX层</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-5 w-5 flex-shrink-0" />
                                <span className="text-sm">400-123-4567</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-5 w-5 flex-shrink-0" />
                                <span className="text-sm">contact@enterprise.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 border-t border-gray-800 pt-8">
                    <p className="text-center text-sm">
                        © {new Date().getFullYear()} Enterprise Demo. All rights reserved. |
                        <Link href="#" className="hover:text-white ml-1">
                            京ICP备XXXXXXXX号
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
