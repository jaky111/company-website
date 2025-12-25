'use client';

import { deletePost } from '@/actions/admin-posts';
import { useState } from 'react';

type Post = {
    id: string;
    title: string;
    type: string;
    views: number;
    createdAt: Date;
};

export default function PostsTable({ posts }: { posts: Post[] }) {
    const [processing, setProcessing] = useState<string | null>(null);

    async function handleDelete(id: string) {
        if (!confirm('确定要删除这篇文章吗?此操作无法撤销。')) {
            return;
        }

        setProcessing(id);
        const result = await deletePost(id);
        setProcessing(null);

        if (!result.success) {
            alert(result.error);
        }
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            标题
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            分类
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            浏览量
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            发布时间
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            操作
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <tr key={post.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                    {post.title}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${post.type === 'COMPANY'
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'bg-green-100 text-green-800'
                                            }`}
                                    >
                                        {post.type === 'COMPANY' ? '公司动态' : '行业资讯'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {post.views}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {new Date(post.createdAt).toLocaleString('zh-CN')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        disabled={processing === post.id}
                                        className="text-red-600 hover:text-red-800 font-medium disabled:opacity-50"
                                    >
                                        {processing === post.id ? '删除中...' : '删除'}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={5}
                                className="px-6 py-12 text-center text-gray-500"
                            >
                                暂无文章数据
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
