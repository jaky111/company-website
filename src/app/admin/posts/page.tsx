import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import PostsTable from '@/components/admin/PostsTable';

const prisma = new PrismaClient();

async function getAllPosts() {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
    });
    return posts;
}

export default async function PostsPage() {
    const posts = await getAllPosts();

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">文章管理</h1>
                    <p className="text-gray-600 mt-2">管理和发布新闻文章</p>
                </div>
                <Link
                    href="/admin/posts/create"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-colors"
                >
                    发布新文章
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
                <PostsTable posts={posts} />
            </div>
        </div>
    );
}
