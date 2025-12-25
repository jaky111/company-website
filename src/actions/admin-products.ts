'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export async function createProduct(formData: FormData) {
    try {
        const title = formData.get('title') as string;
        const slug = formData.get('slug') as string;
        const categoryName = formData.get('category') as string;
        const summary = formData.get('summary') as string;
        const description = formData.get('description') as string;
        const coverImage = formData.get('coverImage') as string;

        // Validate required fields
        if (!title || !slug || !categoryName || !summary || !description || !coverImage) {
            return {
                success: false,
                error: '所有字段均为必填项',
            };
        }

        // Validate slug format (alphanumeric and hyphens only)
        const slugRegex = /^[a-z0-9-]+$/;
        if (!slugRegex.test(slug)) {
            return {
                success: false,
                error: 'URL标识只能包含小写字母、数字和连字符',
            };
        }

        // Check if slug already exists
        const existingProduct = await prisma.product.findUnique({
            where: { slug },
        });

        if (existingProduct) {
            return {
                success: false,
                error: '该 URL 标识已存在,请使用其他标识',
            };
        }

        // Find or create category
        let category = await prisma.category.findFirst({
            where: { name: categoryName },
        });

        if (!category) {
            category = await prisma.category.create({
                data: { name: categoryName },
            });
        }

        // Create product
        await prisma.product.create({
            data: {
                title: title.trim(),
                slug: slug.trim().toLowerCase(),
                summary: summary.trim(),
                description: description.trim(),
                coverImage: coverImage.trim(),
                categoryId: category.id,
                images: [],
                isFeatured: false,
            },
        });

        revalidatePath('/admin/products');
        revalidatePath('/products');
        revalidatePath('/');
    } catch (error) {
        console.error('Error creating product:', error);
        return {
            success: false,
            error: '创建产品失败,请重试',
        };
    }

    redirect('/admin/products');
}

export async function deleteProduct(id: string) {
    try {
        await prisma.product.delete({
            where: { id },
        });

        revalidatePath('/admin/products');
        revalidatePath('/products');
        revalidatePath('/');

        return {
            success: true,
            message: '产品已删除',
        };
    } catch (error) {
        console.error('Error deleting product:', error);
        return {
            success: false,
            error: '删除失败,请重试',
        };
    }
}
