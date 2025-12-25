'use client';

import { createPost } from '@/actions/admin-posts';
import { useState } from 'react';
import Link from 'next/link';

export default function CreatePostPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);
        const result = await createPost(formData);

        if (result && !result.success) {
            alert(result.error);
            setIsSubmitting(false);
        }
        // If success, redirect happens in the Server Action
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">发布新文章</h1>
                <p className="text-gray-600 mt-2">填写文章信息并发布</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8 max-w-3xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-900 mb-2"
                        >
                            标题 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="请输入文章标题"
                        />
                    </div>

                    {/* Type */}
                    <div>
                        <label
                            htmlFor="type"
                            className="block text-sm font-medium text-gray-900 mb-2"
                        >
                            分类 <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="type"
                            name="type"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">请选择分类</option>
                            <option value="COMPANY">公司动态</option>
                            <option value="INDUSTRY">行业资讯</option>
                        </select>
                    </div>

                    {/* Content */}
                    <div>
                        <label
                            htmlFor="content"
                            className="block text-sm font-medium text-gray-900 mb-2"
                        >
                            内容 <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            required
                            rows={12}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            placeholder="请输入文章内容（支持HTML格式）"
                        />
                        <p className="mt-2 text-sm text-gray-500">
                            提示：可以使用 HTML 标签来格式化内容，如 &lt;p&gt;、&lt;strong&gt;、&lt;br&gt; 等
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-6 py-2 rounded-md font-semibold text-white transition-colors ${isSubmitting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-500'
                                }`}
                        >
                            {isSubmitting ? '发布中...' : '发布文章'}
                        </button>
                        <Link
                            href="/admin/posts"
                            className="px-6 py-2 rounded-md font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            取消
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
