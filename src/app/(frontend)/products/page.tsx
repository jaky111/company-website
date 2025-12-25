import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';

const prisma = new PrismaClient();

async function getAllProducts() {
    const products = await prisma.product.findMany({
        include: { category: true },
        orderBy: { createdAt: 'desc' },
    });
    return products;
}

export default async function ProductsPage() {
    const products = await getAllProducts();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Page Header */}
            <div className="bg-white border-b">
                <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                    <h1 className="text-4xl font-bold text-gray-900">产品中心</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        探索我们的企业级解决方案
                    </p>
                </div>
            </div>

            {/* Products Grid */}
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {products.map((product) => (
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
                                    <div className="mt-4 text-sm text-blue-600 font-medium">
                                        查看详情 →
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">暂无产品数据</p>
                    </div>
                )}
            </div>
        </div>
    );
}
