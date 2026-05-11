"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { TopicType } from "@/lib/types/topic"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, RotateCcw } from "lucide-react"
import { TopicFormValues, topicSchema } from "@/lib/schemas/topic"
import useDetailTopic from "@/app/(dashboard)/admin/topics/[id]/action"

export default function FormEditTopic({ topic }: { topic: TopicType }) {
  const { updateMutation, isLoading } = useDetailTopic(topic._id);

  const form = useForm<TopicFormValues>({
    resolver: zodResolver(topicSchema),
    defaultValues: {
      name: topic.name,
      description: topic.description || "",
      level: topic.level as "beginner" | "intermediate" | "advanced",
      color: topic.color,
      icon: topic.icon,
      parentTopic: topic.parentTopic || null,
    },
  })

  const onSubmit = (data: TopicFormValues) => {
    updateMutation.mutate(data);
  }

  return (
    <Card className="border-slate-100 shadow-sm rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl">Chỉnh sửa chủ đề</CardTitle>
        <CardDescription>Cập nhật thông tin chi tiết cho chủ đề &quot;{topic.name}&quot;</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FieldGroup>
            {/* Tên Topic */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Tên chủ đề</FieldLabel>
                  <Input {...field} aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Level */}
              <Controller
                name="level"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Cấp độ</FieldLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn cấp độ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

            </div>

            {/* Màu sắc & Icon */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="color"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Màu sắc chủ đạo</FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <input 
                            type="color" 
                            value={field.value} 
                            onChange={(e) => field.onChange(e.target.value)}
                            className="w-5 h-5 rounded-full border-none cursor-pointer p-0 bg-transparent"
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
                    <FieldLabel>Icon (Lucide name)</FieldLabel>
                    <Input {...field} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>

            {/* Description */}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Mô tả chi tiết</FieldLabel>
                  <Textarea {...field} className="min-h-32 resize-none" />
                  <FieldDescription>Cung cấp ngữ cảnh về chủ đề từ vựng này.</FieldDescription>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-50">
            <Button 
                type="button" 
                variant="outline" 
                onClick={() => form.reset()}
                className="gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Đặt lại
            </Button>
            <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90 text-white gap-2 px-6"
            >
              <Save className="w-4 h-4" /> {isLoading ? "Đang lưu..." : "Cập nhật thay đổi"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}