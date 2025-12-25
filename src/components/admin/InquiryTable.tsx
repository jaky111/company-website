'use client';

import { markAsProcessed, deleteInquiry } from '@/actions/admin-inquiry';
import { useState } from 'react';

type Inquiry = {
    id: string;
    name: string;
    phone: string;
    company: string | null;
    description: string | null;
    status: string;
    createdAt: Date;
};

export default function InquiryTable({ inquiries }: { inquiries: Inquiry[] }) {
    const [processing, setProcessing] = useState<string | null>(null);

    async function handleMarkAsProcessed(id: string) {
        setProcessing(id);
        const result = await markAsProcessed(id);
        setProcessing(null);

        if (!result.success) {
            alert(result.error);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('确定要删除这条留言吗?此操作无法撤销。')) {
            return;
        }

        setProcessing(id);
        const result = await deleteInquiry(id);
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
                            姓名
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            联系方式
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            公司/需求
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            提交时间
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            状态
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            操作
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {inquiries.length > 0 ? (
                        inquiries.map((inquiry) => (
                            <tr key={inquiry.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {inquiry.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {inquiry.phone}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    <div>
                                        {inquiry.company && (
                                            <div className="font-medium">{inquiry.company}</div>
                                        )}
                                        {inquiry.description && (
                                            <div className="text-gray-500 line-clamp-2">
                                                {inquiry.description}
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {new Date(inquiry.createdAt).toLocaleString('zh-CN')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${inquiry.status === 'PENDING'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-green-100 text-green-800'
                                            }`}
                                    >
                                        {inquiry.status === 'PENDING' ? '待处理' : '已处理'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                                    {inquiry.status === 'PENDING' && (
                                        <button
                                            onClick={() => handleMarkAsProcessed(inquiry.id)}
                                            disabled={processing === inquiry.id}
                                            className="text-blue-600 hover:text-blue-800 font-medium disabled:opacity-50"
                                        >
                                            {processing === inquiry.id ? '处理中...' : '标记为已处理'}
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(inquiry.id)}
                                        disabled={processing === inquiry.id}
                                        className="text-red-600 hover:text-red-800 font-medium disabled:opacity-50"
                                    >
                                        删除
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={6}
                                className="px-6 py-12 text-center text-gray-500"
                            >
                                暂无留言数据
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
