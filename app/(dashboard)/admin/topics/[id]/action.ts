'use client';

import apiClient from "@/config/api-client";
import { TopicFormValues } from "@/lib/schemas/topic";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useDetailTopic(id: string) {
    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationFn: async (values: TopicFormValues) => {
            const { data } = await apiClient.patch(`/topics/${id}`, values);
            return data;
        },
        onSuccess: () => {
            toast.success("Cập nhật chủ đề thành công!");
            // Refetch lại dữ liệu để bảng và trang chi tiết đồng bộ
            queryClient.invalidateQueries({ queryKey: ["topics"] });
            queryClient.invalidateQueries({ queryKey: ["topic", id] });
        },
        onError: (error: { response?: { data?: { error?: string } } }) => {
            toast.error(error.response?.data?.error || "Không thể cập nhật chủ đề");
        }
    });

    return {
        updateMutation,
        isLoading: updateMutation.isPending
    };
}