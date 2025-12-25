import { PrismaClient } from '@prisma/client';
import { Package, FileText, MessageSquare, Eye } from 'lucide-react';

const prisma = new PrismaClient();

async function getDashboardStats() {
    const [productCount, postCount, pendingInquiries, totalViews] = await Promise.all([
        prisma.product.count(),
        prisma.post.count(),
        prisma.inquiry.count({
            where: { status: 'PENDING' },
        }),
        prisma.post.aggregate({
            _sum: { views: true },
        }),
    ]);

    return {
        productCount,
        postCount,
        pendingInquiries,
        totalViews: totalViews._sum.views || 0,
    };
}

export default async function AdminDashboardPage() {
    const stats = await getDashboardStats();

    const statsCards = [
        {
            title: '产品总数',
            value: stats.productCount,
            icon: Package,
            color: 'bg-blue-500',
        },
        {
            title: '文章总数',
            value: stats.postCount,
            icon: FileText,
            color: 'bg-green-500',
        },
        {
            title: '待处理留言',
            value: stats.pendingInquiries,
            icon: MessageSquare,
            color: 'bg-yellow-500',
        },
        {
            title: '总浏览量',
            value: stats.totalViews,
            icon: Eye,
            color: 'bg-purple-500',
        },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">仪表盘概览</h1>
                <p className="text-gray-600 mt-2">欢迎回来,这是您的数据概览</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {statsCards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={card.title}
                            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">
                                        {card.title}
                                    </p>
                                    <p className="text-3xl font-bold text-gray-900">
                                        {card.value}
                                    </p>
                                </div>
                                <div className={`${card.color} p-3 rounded-lg`}>
                                    <Icon className="h-6 w-6 text-white" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">快捷操作</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <a
                        href="/admin/products"
                        className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                    >
                        <h3 className="font-semibold text-gray-900 mb-1">管理产品</h3>
                        <p className="text-sm text-gray-600">添加、编辑或删除产品</p>
                    </a>
                    <a
                        href="/admin/posts"
                        className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                    >
                        <h3 className="font-semibold text-gray-900 mb-1">管理文章</h3>
                        <p className="text-sm text-gray-600">发布或编辑新闻文章</p>
                    </a>
                    <a
                        href="/admin/inquiries"
                        className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                    >
                        <h3 className="font-semibold text-gray-900 mb-1">查看留言</h3>
                        <p className="text-sm text-gray-600">处理客户咨询留言</p>
                    </a>
                </div>
            </div>
        </div>
    );
}
