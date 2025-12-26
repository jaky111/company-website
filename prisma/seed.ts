import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seeding...');

    // Create a category (only if it doesn't exist)
    let category = await prisma.category.findFirst({
        where: { name: '企业服务' },
    });

    if (!category) {
        category = await prisma.category.create({
            data: {
                name: '企业服务',
            },
        });
        console.log('✅ Created category:', category.name);
    } else {
        console.log('ℹ️  Category already exists:', category.name);
    }

    // Create a featured product (only if it doesn't exist)
    let product = await prisma.product.findFirst({
        where: { slug: 'enterprise-solution' },
    });

    if (!product) {
        product = await prisma.product.create({
            data: {
                title: '企业级解决方案',
                slug: 'enterprise-solution',
                summary: '为企业提供全方位的数字化转型解决方案',
                description: `
        <h2>产品简介</h2>
        <p>我们的企业级解决方案致力于帮助企业实现数字化转型,提升运营效率。</p>
        <h3>核心功能</h3>
        <ul>
          <li>智能数据分析</li>
          <li>自动化流程管理</li>
          <li>云端协作平台</li>
        </ul>
      `,
                coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
                images: [
                    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
                    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
                ],
                categoryId: category.id,
                isFeatured: true,
            },
        });
        console.log('✅ Created product:', product.title);
    } else {
        console.log('ℹ️  Product already exists:', product.title);
    }

    // Create a company news post (only if it doesn't exist)
    let post = await prisma.post.findFirst({
        where: { title: '公司成功完成A轮融资' },
    });

    if (!post) {
        post = await prisma.post.create({
            data: {
                title: '公司成功完成A轮融资',
                type: 'COMPANY',
                content: `
        <p>我们很高兴地宣布,公司已成功完成A轮融资,融资金额达1000万美元。</p>
        <p>本轮融资将主要用于:</p>
        <ul>
          <li>产品研发和技术创新</li>
          <li>市场拓展和团队建设</li>
          <li>客户服务体系完善</li>
        </ul>
        <p>感谢投资方的信任与支持!</p>
      `,
                author: '市场部',
                views: 0,
                published: true,
            },
        });
        console.log('✅ Created post:', post.title);
    } else {
        console.log('ℹ️  Post already exists:', post.title);
    }

    // Create an admin user (only if it doesn't exist)
    let user = await prisma.user.findUnique({
        where: { username: 'admin' },
    });

    if (!user) {
        user = await prisma.user.create({
            data: {
                username: 'admin',
                password: 'admin123', // In production, use bcrypt to hash passwords
                role: 'ADMIN',
            },
        });
        console.log('✅ Created admin user:', user.username);
    } else {
        console.log('ℹ️  Admin user already exists:', user.username);
    }

    // Create default site config if not exists
    const existingConfig = await prisma.siteConfig.findFirst();
    if (!existingConfig) {
        const siteConfig = await prisma.siteConfig.create({
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
        console.log('✅ Created site config:', siteConfig.siteName);
    } else {
        console.log('ℹ️  Site config already exists:', existingConfig.siteName);
    }

    console.log('🎉 Database seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
