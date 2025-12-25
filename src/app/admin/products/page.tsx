import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import ProductsTable from '@/components/admin/ProductsTable';

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
        <div>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">产品管理</h1>
                    <p className="text-gray-600 mt-2">管理和添加产品信息</p>
                </div>
                <Link
                    href="/admin/products/create"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-colors"
                >
                    添加新产品
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
                <ProductsTable products={products} />
            </div>
        </div>
    );
}
