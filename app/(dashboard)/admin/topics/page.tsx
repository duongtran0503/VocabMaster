import TopicsTable from "@/app/(dashboard)/admin/_components/topics-table";
import apiFetch from "@/lib/api/api-fetch";
import { ApiPaginationResponse } from "@/lib/types/api";
import { TopicType } from "@/lib/types/topic";

export default async function TopicsPage() {
    const dataTopics = await apiFetch.get<ApiPaginationResponse<TopicType[]>>("/topics");
    return <div>
          <TopicsTable pagination={dataTopics.pagination} initialData={dataTopics.data} />
    </div>
}