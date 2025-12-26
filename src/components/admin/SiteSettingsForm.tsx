'use client';

import { useState } from 'react';

type SiteConfig = {
    id: string;
    siteName: string;
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string;
    contactEmail: string;
    contactPhone: string;
    footerText: string;
};

type Props = {
    config: SiteConfig;
    updateAction: (formData: FormData) => Promise<{ success: boolean; message?: string; error?: string }>;
};

export default function SiteSettingsForm({ config, updateAction }: Props) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);

        const formData = new FormData(e.currentTarget);
        const result = await updateAction(formData);

        setIsSubmitting(false);

        if (result.success) {
            setMessage({ type: 'success', text: result.message || '保存成功' });
        } else {
            setMessage({ type: 'error', text: result.error || '保存失败' });
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Site Name */}
            <div>
                <label htmlFor="siteName" className="block text-sm font-medium text-gray-900 mb-2">
                    网站名称 <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="siteName"
                    name="siteName"
                    required
                    defaultValue={config.siteName}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enterprise Solutions"
                />
            </div>

            {/* Hero Title */}
            <div>
                <label htmlFor="heroTitle" className="block text-sm font-medium text-gray-900 mb-2">
                    首页大标题 <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="heroTitle"
                    name="heroTitle"
                    required
                    defaultValue={config.heroTitle}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="企业级解决方案"
                />
            </div>

            {/* Hero Subtitle */}
            <div>
                <label htmlFor="heroSubtitle" className="block text-sm font-medium text-gray-900 mb-2">
                    首页副标题 <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="heroSubtitle"
                    name="heroSubtitle"
                    required
                    rows={2}
                    defaultValue={config.heroSubtitle}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="为您的业务提供全方位的数字化转型服务"
                />
            </div>

            {/* Hero Image */}
            <div>
                <label htmlFor="heroImage" className="block text-sm font-medium text-gray-900 mb-2">
                    首页背景图 URL
                </label>
                <input
                    type="url"
                    id="heroImage"
                    name="heroImage"
                    defaultValue={config.heroImage}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://images.unsplash.com/..."
                />
                <p className="mt-2 text-sm text-gray-500">
                    推荐使用 Unsplash 等图片服务的链接
                </p>
            </div>

            {/* Contact Email */}
            <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-900 mb-2">
                    联系邮箱 <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    required
                    defaultValue={config.contactEmail}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="contact@enterprise.com"
                />
            </div>

            {/* Contact Phone */}
            <div>
                <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-900 mb-2">
                    联系电话 <span className="text-red-500">*</span>
                </label>
                <input
                    type="tel"
                    id="contactPhone"
                    name="contactPhone"
                    required
                    defaultValue={config.contactPhone}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="400-888-8888"
                />
            </div>

            {/* Footer Text */}
            <div>
                <label htmlFor="footerText" className="block text-sm font-medium text-gray-900 mb-2">
                    页脚版权信息
                </label>
                <input
                    type="text"
                    id="footerText"
                    name="footerText"
                    defaultValue={config.footerText}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="© 2024 Enterprise Solutions. All rights reserved."
                />
            </div>

            {/* Message */}
            {message && (
                <div
                    className={`p-3 rounded-lg text-sm ${message.type === 'success'
                            ? 'bg-green-50 border border-green-200 text-green-700'
                            : 'bg-red-50 border border-red-200 text-red-700'
                        }`}
                >
                    {message.text}
                </div>
            )}

            {/* Submit Button */}
            <div className="flex items-center gap-4 pt-4">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-2 rounded-md font-semibold text-white transition-colors ${isSubmitting
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-500'
                        }`}
                >
                    {isSubmitting ? '保存中...' : '保存设置'}
                </button>
            </div>
        </form>
    );
}
