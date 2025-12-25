'use client';

import { createProduct } from '@/actions/admin-products';
import { useState } from 'react';
import Link from 'next/link';

export default function CreateProductPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);
        const result = await createProduct(formData);

        if (result && !result.success) {
            alert(result.error);
            setIsSubmitting(false);
        }
        // If success, redirect happens in the Server Action
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">添加新产品</h1>
                <p className="text-gray-600 mt-2">填写产品信息并添加到产品库</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8 max-w-3xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-900 mb-2"
                        >
                            产品名称 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="请输入产品名称"
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label
                            htmlFor="slug"
                            className="block text-sm font-medium text-gray-900 mb-2"
                        >
                            URL 标识 (Slug) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="slug"
                            name="slug"
                            required
                            pattern="[a-z0-9-]+"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="例如: enterprise-pro (仅小写字母、数字和连字符)"
                        />
                        <p className="mt-2 text-sm text-gray-500">
                            URL 标识需唯一,将用于产品详情页链接
                        </p>
                    </div>

                    {/* Category */}
                    <div>
                        <label
                            htmlFor="category"
                            className="block text-sm font-medium text-gray-900 mb-2"
                        >
                            所属分类 <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="category"
                            name="category"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">请选择分类</option>
                            <option value="企业服务">企业服务</option>
                            <option value="消费电子">消费电子</option>
                            <option value="云解决方案">云解决方案</option>
                        </select>
                    </div>

                    {/* Cover Image */}
                    <div>
                        <label
                            htmlFor="coverImage"
                            className="block text-sm font-medium text-gray-900 mb-2"
                        >
                            封面图片链接 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="url"
                            id="coverImage"
                            name="coverImage"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="请输入 https://... 开头的图片地址"
                        />
                        <p className="mt-2 text-sm text-gray-500">
                            推荐使用 Unsplash 等图片服务的链接
                        </p>
                    </div>

                    {/* Summary */}
                    <div>
                        <label
                            htmlFor="summary"
                            className="block text-sm font-medium text-gray-900 mb-2"
                        >
                            简短摘要 <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="summary"
                            name="summary"
                            required
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            placeholder="请输入产品简短摘要（1-2句话）"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-900 mb-2"
                        >
                            详细介绍 <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            required
                            rows={8}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            placeholder="请输入产品详细介绍（支持HTML格式）"
                        />
                        <p className="mt-2 text-sm text-gray-500">
                            提示：可以使用 HTML 标签来格式化内容
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
                            {isSubmitting ? '添加中...' : '添加产品'}
                        </button>
                        <Link
                            href="/admin/products"
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
