'use client';

import { deleteProduct } from '@/actions/admin-products';
import { useState } from 'react';
import Image from 'next/image';

type Product = {
    id: string;
    title: string;
    coverImage: string;
    category: {
        name: string;
    };
    createdAt: Date;
};

export default function ProductsTable({ products }: { products: Product[] }) {
    const [processing, setProcessing] = useState<string | null>(null);

    async function handleDelete(id: string) {
        if (!confirm('确定要删除这个产品吗?此操作无法撤销。')) {
            return;
        }

        setProcessing(id);
        const result = await deleteProduct(id);
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
                            缩略图
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            标题
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            分类
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            创建时间
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            操作
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="relative w-16 h-16 bg-gray-100 rounded overflow-hidden">
                                        {product.coverImage ? (
                                            <Image
                                                src={product.coverImage}
                                                alt={product.title}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                                                无图片
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                    {product.title}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                        {product.category.name}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {new Date(product.createdAt).toLocaleString('zh-CN')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        disabled={processing === product.id}
                                        className="text-red-600 hover:text-red-800 font-medium disabled:opacity-50"
                                    >
                                        {processing === product.id ? '删除中...' : '删除'}
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
                                暂无产品数据
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
