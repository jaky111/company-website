// 强制设为动态页面
export const dynamic = 'force-dynamic';

import { getSiteConfig, updateSiteConfig } from '@/actions/site-config';
import SiteSettingsForm from '@/components/admin/SiteSettingsForm';

export default async function SiteSettingsPage() {
    const config = await getSiteConfig();

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">系统设置</h1>
                <p className="text-gray-600 mt-2">管理网站的全局配置信息</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8 max-w-4xl">
                <SiteSettingsForm config={config} updateAction={updateSiteConfig} />
            </div>
        </div>
    );
}
