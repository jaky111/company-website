import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

async function getAllPosts() {
    const posts = await prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
    });
    return posts;
}

export default async function NewsPage() {
    const posts = await getAllPosts();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Page Header */}
            <div className="bg-white border-b">
                <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                    <h1 className="text-4xl font-bold text-gray-900">新闻动态</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        了解最新的公司动态和行业资讯
                    </p>
                </div>
            </div>

            {/* News List */}
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                {posts.length > 0 ? (
                    <div className="space-y-6">
                        {posts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/news/${post.id}`}
                                className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
                            >
                                <div className="flex flex-col md:flex-row md:items-start gap-6">
                                    {/* Left: Date */}
                                    <div className="flex-shrink-0 text-center md:w-24">
                                        <div className="text-3xl font-bold text-blue-600">
                                            {new Date(post.createdAt).getDate()}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {new Date(post.createdAt).toLocaleDateString('zh-CN', {
                                                year: 'numeric',
                                                month: 'short',
                                            })}
                                        </div>
                                    </div>

                                    {/* Right: Content */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span
                                                className={`inline-block px-2 py-1 text-xs font-semibold rounded ${post.type === 'COMPANY'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : 'bg-green-100 text-green-700'
                                                    }`}
                                            >
                                                {post.type === 'COMPANY' ? '公司动态' : '行业资讯'}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                作者: {post.author}
                                            </span>
                                        </div>
                                        <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                                            {post.title}
                                        </h2>
                                        <p className="text-gray-600 line-clamp-2">
                                            {post.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                                        </p>
                                        <div className="mt-4 text-sm text-blue-600 font-medium">
                                            阅读全文 →
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">暂无新闻数据</p>
                    </div>
                )}
            </div>
        </div>
    );
}
