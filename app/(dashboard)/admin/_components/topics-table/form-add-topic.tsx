"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "@/components/ui/input-group"
import { Textarea } from "@/components/ui/textarea"
import { TopicFormValues, topicSchema } from "@/lib/schemas/topic"
import apiClient from "@/config/api-client"

export default function FormAddTopic({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const queryClient = useQueryClient()

  const form = useForm<TopicFormValues>({
    resolver: zodResolver(topicSchema),
    defaultValues: {
      name: "",
      description: "",
      level: "beginner",
      color: "#6367FF",
      icon: "Book",
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (values: TopicFormValues) => apiClient.post("/topics", values),
    onSuccess: () => {
      toast.success("Tạo chủ đề thành công!")
      queryClient.invalidateQueries({ queryKey: ["topics"] })
      form.reset()
      onClose()
    },
    onError: (err) => {
        const errorRes = err instanceof Error ? err.message : "Có lỗi xảy ra";
        toast.error(errorRes);
    }
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle>Thêm chủ đề mới</DialogTitle>
          <DialogDescription className="sr-only">
            Nhập thông tin chi tiết để tạo chủ đề từ vựng mới.
          </DialogDescription>
        </DialogHeader>

        <form id="add-topic-form" onSubmit={form.handleSubmit((data) => mutate(data))}>
          <FieldGroup>
            {/* Tên Topic */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Tên chủ đề</FieldLabel>
                  <Input 
                    {...field} 
                    placeholder="Ví dụ: Công nghệ, Gia đình..." 
                    aria-invalid={fieldState.invalid} 
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Màu sắc & Icon */}
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="color"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Màu sắc</FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <div 
                          className="w-4 h-4 rounded-full border border-slate-200" 
                          style={{ backgroundColor: field.value }}
                        />
                      </InputGroupAddon>
                      <Input {...field} className="font-mono uppercase" />
                    </InputGroup>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="icon"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Icon (Lucide)</FieldLabel>
                    <Input {...field} placeholder="Ví dụ: Book, Users..." />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>

            {/* Mô tả */}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Mô tả</FieldLabel>
                  <Textarea 
                    {...field} 
                    placeholder="Nhập mô tả ngắn cho chủ đề này..."
                    className="min-h-24 resize-none"
                  />
                  <FieldDescription>Mô tả này sẽ hiển thị trên ứng dụng di động.</FieldDescription>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Hủy</Button>
          <Button type="submit" form="add-topic-form" disabled={isPending}>
            {isPending ? "Đang lưu..." : "Lưu chủ đề"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}