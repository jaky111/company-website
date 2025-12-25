import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';

const prisma = new PrismaClient();

async function getPostById(id: string) {
    const post = await prisma.post.findUnique({
        where: { id },
    });
    return post;
}

export default async function NewsDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    // Await params in Next.js 15
    const { id } = await params;
    const post = await getPostById(id);

    // If post not found, return 404
    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
                    <nav className="flex items-center gap-2 text-sm text-gray-600">
                        <Link href="/" className="hover:text-blue-600">
                            首页
                        </Link>
                        <span>/</span>
                        <Link href="/news" className="hover:text-blue-600">
                            新闻动态
                        </Link>
                        <span>/</span>
                        <span className="text-gray-900">文章详情</span>
                    </nav>
                </div>
            </div>

            {/* Article Content */}
            <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
                <article className="bg-white rounded-lg shadow-sm p-8 lg:p-12">
                    {/* Article Header */}
                    <div className="mb-8 pb-8 border-b">
                        <div className="flex items-center gap-2 mb-4">
                            <span
                                className={`inline-block px-3 py-1 text-sm font-semibold rounded ${post.type === 'COMPANY'
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'bg-green-100 text-green-700'
                                    }`}
                            >
                                {post.type === 'COMPANY' ? '公司动态' : '行业资讯'}
                            </span>
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                            {post.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>
                                    {new Date(post.createdAt).toLocaleDateString('zh-CN', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <span>{post.author}</span>
                            </div>
                        </div>
                    </div>

                    {/* Article Body */}
                    <div
                        className="prose prose-lg max-w-none text-gray-600"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </article>

                {/* Back Button */}
                <div className="mt-8">
                    <Link
                        href="/news"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-500 font-medium"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        返回新闻列表
                    </Link>
                </div>
            </div>
        </div>
    );
}
