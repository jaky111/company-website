'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function getSiteConfig() {
    try {
        // Get the first (and only) site config record
        let config = await prisma.siteConfig.findFirst();

        // If no config exists, create default one
        if (!config) {
            config = await prisma.siteConfig.create({
                data: {
                    siteName: 'Enterprise Solutions',
                    heroTitle: '企业级解决方案',
                    heroSubtitle: '为您的业务提供全方位的数字化转型服务',
                    heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200',
                    contactEmail: 'contact@enterprise.com',
                    contactPhone: '400-888-8888',
                    footerText: '© 2024 Enterprise Solutions. All rights reserved.',
                },
            });
        }

        return config;
    } catch (error) {
        console.error('Error getting site config:', error);
        // Return default values if database error
        return {
            id: '',
            siteName: 'Enterprise Solutions',
            heroTitle: '企业级解决方案',
            heroSubtitle: '为您的业务提供全方位的数字化转型服务',
            heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200',
            contactEmail: 'contact@enterprise.com',
            contactPhone: '400-888-8888',
            footerText: '© 2024 Enterprise Solutions. All rights reserved.',
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
}

export async function updateSiteConfig(formData: FormData) {
    try {
        const siteName = formData.get('siteName') as string;
        const heroTitle = formData.get('heroTitle') as string;
        const heroSubtitle = formData.get('heroSubtitle') as string;
        const heroImage = formData.get('heroImage') as string;
        const contactEmail = formData.get('contactEmail') as string;
        const contactPhone = formData.get('contactPhone') as string;
        const footerText = formData.get('footerText') as string;

        // Validate required fields
        if (!siteName || !heroTitle || !heroSubtitle || !contactEmail || !contactPhone) {
            return {
                success: false,
                error: '所有必填字段不能为空',
            };
        }

        // Get existing config or create new one
        let config = await prisma.siteConfig.findFirst();

        if (config) {
            // Update existing config
            await prisma.siteConfig.update({
                where: { id: config.id },
                data: {
                    siteName,
                    heroTitle,
                    heroSubtitle,
                    heroImage,
                    contactEmail,
                    contactPhone,
                    footerText,
                },
            });
        } else {
            // Create new config
            await prisma.siteConfig.create({
                data: {
                    siteName,
                    heroTitle,
                    heroSubtitle,
                    heroImage,
                    contactEmail,
                    contactPhone,
                    footerText,
                },
            });
        }

        // Revalidate all pages that use site config
        revalidatePath('/');
        revalidatePath('/admin');
        revalidatePath('/admin/settings');

        return {
            success: true,
            message: '网站设置已更新',
        };
    } catch (error) {
        console.error('Error updating site config:', error);
        return {
            success: false,
            error: '更新失败,请重试',
        };
    }
}
