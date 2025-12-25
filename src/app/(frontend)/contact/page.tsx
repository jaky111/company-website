'use client';

import { useState } from 'react';
import { submitInquiry } from '@/actions/submit-inquiry';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{
        type: 'success' | 'error';
        text: string;
    } | null>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);
        setMessage(null);

        const formData = new FormData(event.currentTarget);
        const result = await submitInquiry(formData);

        setIsSubmitting(false);

        if (result.success) {
            setMessage({
                type: 'success',
                text: result.message || '提交成功!',
            });
            // Reset form
            event.currentTarget.reset();
        } else {
            setMessage({
                type: 'error',
                text: result.error || '提交失败',
            });
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Page Header */}
            <div className="bg-white border-b">
                <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                    <h1 className="text-4xl font-bold text-gray-900">联系我们</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        我们期待与您的合作,请留下您的联系方式
                    </p>
                </div>
            </div>

            {/* Contact Content */}
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    {/* Left: Contact Information */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">联系信息</h2>

                        <div className="space-y-6 mb-12">
                            <div className="flex items-start gap-4">
                                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg flex-shrink-0">
                                    <MapPin className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">公司地址</h3>
                                    <p className="text-gray-600">北京市朝阳区XX大厦XX层</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg flex-shrink-0">
                                    <Phone className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">联系电话</h3>
                                    <p className="text-gray-600">400-123-4567</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg flex-shrink-0">
                                    <Mail className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">电子邮箱</h3>
                                    <p className="text-gray-600">contact@enterprise.com</p>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                            <span className="text-gray-500">地图占位</span>
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">在线留言</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-900 mb-2"
                                >
                                    姓名 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="请输入您的姓名"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-medium text-gray-900 mb-2"
                                >
                                    联系电话 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    required
                                    pattern="1[3-9]\d{9}"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="请输入您的手机号码"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="company"
                                    className="block text-sm font-medium text-gray-900 mb-2"
                                >
                                    公司名称
                                </label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="请输入您的公司名称"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-900 mb-2"
                                >
                                    需求描述
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    placeholder="请简要描述您的需求"
                                />
                            </div>

                            {/* Success/Error Message */}
                            {message && (
                                <div
                                    className={`p-4 rounded-md ${message.type === 'success'
                                            ? 'bg-green-50 text-green-800 border border-green-200'
                                            : 'bg-red-50 text-red-800 border border-red-200'
                                        }`}
                                >
                                    {message.text}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-3 px-6 rounded-md font-semibold text-white transition-colors ${isSubmitting
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-500'
                                    }`}
                            >
                                {isSubmitting ? '提交中...' : '提交留言'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
