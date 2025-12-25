import { PrismaClient } from '@prisma/client';
import InquiryTable from '@/components/admin/InquiryTable';

const prisma = new PrismaClient();

async function getAllInquiries() {
    const inquiries = await prisma.inquiry.findMany({
        orderBy: { createdAt: 'desc' },
    });
    return inquiries;
}

export default async function InquiriesPage() {
    const inquiries = await getAllInquiries();

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">客户线索</h1>
                <p className="text-gray-600 mt-2">查看和管理客户提交的咨询留言</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
                <InquiryTable inquiries={inquiries} />
            </div>
        </div>
    );
}
