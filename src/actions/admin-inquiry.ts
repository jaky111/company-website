'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function markAsProcessed(id: string) {
    try {
        await prisma.inquiry.update({
            where: { id },
            data: { status: 'PROCESSED' },
        });

        revalidatePath('/admin/inquiries');

        return {
            success: true,
            message: '已标记为已处理',
        };
    } catch (error) {
        console.error('Error marking inquiry as processed:', error);
        return {
            success: false,
            error: '操作失败,请重试',
        };
    }
}

export async function deleteInquiry(id: string) {
    try {
        await prisma.inquiry.delete({
            where: { id },
        });

        revalidatePath('/admin/inquiries');

        return {
            success: true,
            message: '留言已删除',
        };
    } catch (error) {
        console.error('Error deleting inquiry:', error);
        return {
            success: false,
            error: '删除失败,请重试',
        };
    }
}
