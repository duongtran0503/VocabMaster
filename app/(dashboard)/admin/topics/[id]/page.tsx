import FormEditTopic from "@/app/(dashboard)/admin/_components/form-edit-topic";
import apiFetch from "@/lib/api/api-fetch";
import { ApiResponse } from "@/lib/types/api";
import { TopicType } from "@/lib/types/topic";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function TopicDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const res = await apiFetch.get<ApiResponse<TopicType>>(`/topics/${id}`);
    
    if (!res.success || !res.data) {
        return <div>Không tìm thấy chủ đề</div>;
    }

    return (
        <div className="container mx-auto py-8 max-w-3xl">
            <div className="mb-6 flex items-center gap-4">
                <Link 
                    href="/admin/topics" 
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                    <ChevronLeft className="w-5 h-5 text-slate-600" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Chi tiết chủ đề</h1>
                    <p className="text-sm text-slate-500">ID: {id}</p>
                </div>
            </div>

            <FormEditTopic topic={res.data} />
        </div>
    )
}