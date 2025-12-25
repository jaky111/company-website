import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const prisma = new PrismaClient();

async function getProductBySlug(slug: string) {
    const product = await prisma.product.findUnique({
        where: { slug },
        include: { category: true },
    });
    return product;
}

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    // Await params in Next.js 15
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    // If product not found, return 404
    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
                    <nav className="flex items-center gap-2 text-sm text-gray-600">
                        <Link href="/" className="hover:text-blue-600">
                            首页
                        </Link>
                        <span>/</span>
                        <Link href="/products" className="hover:text-blue-600">
                            产品中心
                        </Link>
                        <span>/</span>
                        <span className="text-gray-900">{product.title}</span>
                    </nav>
                </div>
            </div>

            {/* Product Detail */}
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    {/* Left: Product Image */}
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-200">
                        {product.coverImage ? (
                            <Image
                                src={product.coverImage}
                                alt={product.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-100 to-gray-200">
                                <span className="text-gray-400">暂无图片</span>
                            </div>
                        )}
                    </div>

                    {/* Right: Product Info */}
                    <div className="flex flex-col">
                        <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full w-fit mb-4">
                            {product.category.name}
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            {product.title}
                        </h1>
                        <p className="text-lg text-gray-600 mb-8">{product.summary}</p>

                        {/* CTA Button */}
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors w-fit"
                        >
                            联系咨询
                        </Link>

                        {/* Additional Info */}
                        {product.pdfUrl && (
                            <div className="mt-8 pt-8 border-t">
                                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                                    产品资料
                                </h3>
                                <a
                                    href={product.pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-500 text-sm"
                                >
                                    下载产品手册 →
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Description */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">产品详情</h2>
                    <div
                        className="prose prose-lg max-w-none text-gray-600"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                </div>

                {/* Image Gallery (if multiple images) */}
                {product.images && product.images.length > 1 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">产品图册</h2>
                        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                            {product.images.map((imageUrl, index) => (
                                <div
                                    key={index}
                                    className="relative aspect-square rounded-lg overflow-hidden bg-gray-200"
                                >
                                    <Image
                                        src={imageUrl}
                                        alt={`${product.title} - 图片 ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
