'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function submitInquiry(formData: FormData) {
    try {
        // Extract form data
        const name = formData.get('name') as string;
        const phone = formData.get('phone') as string;
        const company = formData.get('company') as string;
        const description = formData.get('description') as string;

        // Validate required fields
        if (!name || !phone) {
            return {
                success: false,
                error: '姓名和联系电话为必填项',
            };
        }

        // Basic phone validation (Chinese phone number format)
        const phoneRegex = /^1[3-9]\d{9}$/;
        if (!phoneRegex.test(phone)) {
            return {
                success: false,
                error: '请输入有效的手机号码',
            };
        }

        // Insert into database
        await prisma.inquiry.create({
            data: {
                name: name.trim(),
                phone: phone.trim(),
                company: company?.trim() || null,
                description: description?.trim() || null,
                status: 'PENDING',
            },
        });

        return {
            success: true,
            message: '提交成功!我们会尽快与您联系。',
        };
    } catch (error) {
        console.error('Error submitting inquiry:', error);
        return {
            success: false,
            error: '提交失败,请稍后重试',
        };
    }
}
