'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export async function createPost(formData: FormData) {
    try {
        const title = formData.get('title') as string;
        const type = formData.get('type') as string;
        const content = formData.get('content') as string;

        // Validate required fields
        if (!title || !type || !content) {
            return {
                success: false,
                error: '标题、分类和内容为必填项',
            };
        }

        // Validate type
        if (type !== 'COMPANY' && type !== 'INDUSTRY') {
            return {
                success: false,
                error: '无效的文章分类',
            };
        }

        // Create post
        await prisma.post.create({
            data: {
                title: title.trim(),
                type: type as 'COMPANY' | 'INDUSTRY',
                content: content.trim(),
                author: 'Admin', // Default author
                published: true,
                views: 0,
            },
        });

        revalidatePath('/admin/posts');
        revalidatePath('/news');
    } catch (error) {
        console.error('Error creating post:', error);
        return {
            success: false,
            error: '创建文章失败,请重试',
        };
    }

    redirect('/admin/posts');
}

export async function deletePost(id: string) {
    try {
        await prisma.post.delete({
            where: { id },
        });

        revalidatePath('/admin/posts');
        revalidatePath('/news');

        return {
            success: true,
            message: '文章已删除',
        };
    } catch (error) {
        console.error('Error deleting post:', error);
        return {
            success: false,
            error: '删除失败,请重试',
        };
    }
}
