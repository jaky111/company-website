import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';
import { Award, Users, Clock, Shield } from 'lucide-react';

const prisma = new PrismaClient();

// Server Component - fetch data directly
async function getFeaturedProducts() {
  const products = await prisma.product.findMany({
    where: { isFeatured: true },
    take: 3,
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });
  return products;
}

async function getLatestNews() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    take: 3,
    orderBy: { createdAt: 'desc' },
  });
  return posts;
}

const advantages = [
  {
    icon: Users,
    title: '专业团队',
    description: '拥有行业顶尖的技术专家和咨询顾问',
  },
  {
    icon: Award,
    title: '十年经验',
    description: '深耕企业服务领域,积累丰富实战经验',
  },
  {
    icon: Clock,
    title: '全天候支持',
    description: '7×24小时技术支持,快速响应客户需求',
  },
  {
    icon: Shield,
    title: '安全可靠',
    description: '企业级安全保障,数据隐私严格保护',
  },
];

export default async function HomePage() {
  const [featuredProducts, latestNews] = await Promise.all([
    getFeaturedProducts(),
    getLatestNews(),
  ]);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              构建未来的企业级解决方案
            </h1>
            <p className="text-lg leading-8 text-blue-100 mb-10">
              为企业提供全方位的数字化转型服务,助力业务创新与效率提升
            </p>
            <Link
              href="/contact"
              className="inline-block rounded-md bg-white px-8 py-3 text-base font-semibold text-blue-900 shadow-sm hover:bg-blue-50 transition-colors"
            >
              立即咨询
            </Link>
          </div>
        </div>
      </section>

      {/* Core Advantages Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              核心优势
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              专业、可靠、高效的企业服务
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((advantage) => {
              const Icon = advantage.icon;
              return (
                <div
                  key={advantage.title}
                  className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {advantage.title}
                  </h3>
                  <p className="text-sm text-gray-600">{advantage.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              明星产品
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              为您提供最优质的解决方案
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <div className="relative h-48 bg-gray-200">
                    {product.coverImage ? (
                      <Image
                        src={product.coverImage}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-100 to-gray-200">
                        <span className="text-gray-400 text-sm">暂无图片</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-blue-600 font-semibold mb-2">
                      {product.category.name}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {product.summary}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                暂无产品数据
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              新闻动态
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              了解最新的公司动态和行业资讯
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {latestNews.length > 0 ? (
              latestNews.map((post) => (
                <Link
                  key={post.id}
                  href={`/news/${post.id}`}
                  className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow p-6"
                >
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded">
                      {post.type === 'COMPANY' ? '公司动态' : '行业资讯'}
                    </span>
                    <span>
                      {new Date(post.createdAt).toLocaleDateString('zh-CN')}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {post.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                  </p>
                  <div className="mt-4 text-sm text-blue-600 font-medium">
                    阅读更多 →
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                暂无新闻数据
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
