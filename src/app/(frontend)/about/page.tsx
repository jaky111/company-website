import Image from 'next/image';
import { Users, Briefcase, Award, TrendingUp } from 'lucide-react';

const timeline = [
    {
        year: '2020',
        title: '公司成立',
        description: '在北京正式成立,开启企业服务新篇章',
    },
    {
        year: '2022',
        title: 'A轮融资',
        description: '获得知名投资机构千万级融资,加速业务拓展',
    },
    {
        year: '2023',
        title: '业务突破',
        description: '服务客户突破500家,成为行业领先企业',
    },
    {
        year: '2024',
        title: '战略升级',
        description: '启动全国布局,开设多个分公司',
    },
];

const stats = [
    {
        icon: Users,
        value: '200+',
        label: '专业团队',
    },
    {
        icon: Briefcase,
        value: '500+',
        label: '服务客户',
    },
    {
        icon: Award,
        value: '50+',
        label: '行业奖项',
    },
    {
        icon: TrendingUp,
        value: '98%',
        label: '客户满意度',
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Page Header */}
            <div className="bg-white border-b">
                <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                    <h1 className="text-4xl font-bold text-gray-900">关于我们</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        了解我们的故事和发展历程
                    </p>
                </div>
            </div>

            {/* Section 1: Company Introduction */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
                        {/* Left: Text */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                公司简介
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    Enterprise Demo 成立于2020年,是一家专注于企业级数字化转型解决方案的创新型科技公司。
                                    我们致力于为企业提供全方位的技术服务,帮助客户实现业务创新与效率提升。
                                </p>
                                <p>
                                    公司拥有一支由行业顶尖专家组成的技术团队,深耕企业服务领域多年,
                                    积累了丰富的实战经验。我们始终坚持以客户需求为导向,
                                    提供定制化的解决方案,确保每一个项目都能达到预期目标。
                                </p>
                                <p>
                                    凭借专业的技术实力和优质的服务,我们已成功服务500+企业客户,
                                    涵盖金融、制造、零售、教育等多个行业领域,赢得了客户的广泛认可和信赖。
                                </p>
                            </div>
                        </div>

                        {/* Right: Image */}
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200">
                            <div className="flex items-center justify-center h-full">
                                <span className="text-gray-400 text-lg">公司形象图</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Timeline */}
            <section className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">发展历程</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            见证我们的成长与突破
                        </p>
                    </div>

                    <div className="mx-auto max-w-3xl">
                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200" />

                            {/* Timeline Items */}
                            <div className="space-y-12">
                                {timeline.map((item, index) => (
                                    <div key={index} className="relative flex gap-6">
                                        {/* Year Circle */}
                                        <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold z-10">
                                            {item.year}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-600">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: Statistics */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">数据统计</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            用数字见证我们的实力
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div
                                    key={index}
                                    className="text-center bg-gray-50 rounded-lg p-8 hover:bg-blue-50 transition-colors"
                                >
                                    <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4">
                                        <Icon className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <div className="text-4xl font-bold text-gray-900 mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-600">{stat.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}
