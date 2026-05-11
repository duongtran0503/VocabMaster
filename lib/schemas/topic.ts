import * as z from "zod";

export const topicSchema = z.object({
    name: z.string().min(2, "Tên chủ đề phải có ít nhất 2 ký tự"),
    description: z.string().optional(),
    level: z.enum(["beginner", "intermediate", "advanced"]),
    color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Màu sắc không hợp lệ"),
    icon: z.string().min(1, "Vui lòng chọn Icon"),
    parentTopic: z.string().nullable().optional(),
});

export type TopicFormValues = z.infer<typeof topicSchema>;