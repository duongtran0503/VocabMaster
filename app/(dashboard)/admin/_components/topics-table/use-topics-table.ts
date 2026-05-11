
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from "@tanstack/react-query";
import { PaginationType, ApiPaginationResponse } from "@/lib/types/api";
import { TopicType } from "@/lib/types/topic";
import apiClient from "@/config/api-client";

interface useTopicsTableInitialState {
    data: TopicType[];
    pagination: PaginationType;
}

export default function useTopicsTable(initialState: useTopicsTableInitialState) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const patchName = usePathname()
    // Quản lý state phân trang nội bộ
    const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string, 10) : initialState.pagination.currentPage;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') as string, 10) : initialState.pagination.itemPerPage;
    const search = searchParams.get('search') || "";

    // TanStack Query để fetch data khi page/limit thay đổi
    const { data: queryData, isLoading, isPlaceholderData } = useQuery({
        queryKey: ['topics', page, limit, search],
        queryFn: async () => {
            const res = await apiClient.get<ApiPaginationResponse<TopicType[]>>(
                `/topics?page=${page}&limit=${limit}`
            );
            return res.data;
        },
        initialData: page === initialState.pagination.currentPage ? {
            data: initialState.data,
            pagination: initialState.pagination,
            success: true
        } : undefined,
        placeholderData: (previousData) => previousData, // Giữ dữ liệu cũ khi đang load trang mới
    });

    const setPage = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        router.push(`${patchName}?${params.toString()}`);

    }
    const setLimit = (limit: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('limit', limit.toString());
        router.push(`${patchName}?${params.toString()}`);

    }

    return {
        data: queryData?.data || initialState.data,
        pagination: queryData?.pagination || initialState.pagination,
        isLoading,
        isPlaceholderData,
        setPage,
        setLimit
    };
}