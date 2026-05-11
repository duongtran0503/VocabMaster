'use client';

import { ColumnDef } from "@tanstack/react-table";
import { TopicType } from "@/lib/types/topic";
import { Badge } from "@/components/ui/badge"; // Shadcn UI
import { Button } from "@/components/ui/button"; // Shadcn UI
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const columns = (
  page: number,
  limit: number,
  onAction: (type: string, topic: TopicType) => void
): ColumnDef<TopicType>[] => [
  {
    header: "STT",
    cell: ({ row }) => {
      return (page - 1) * limit + row.index + 1;
    },
  },
  {
    accessorKey: "name",
    header: "Tên topic",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div 
          className="w-8 h-8 rounded-md flex-shrink-0" 
          style={{ backgroundColor: row.original.color }} 
        />
        <span className="font-medium text-slate-900">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "level",
    header: "Cấp độ",
    cell: ({ row }) => (
      <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-none capitalize">
        {row.original.level}
      </Badge>
    ),
  },
  {
    accessorKey: "totalWords",
    header: "Tổng từ vựng",
    cell: ({ row }) => <span className="font-mono">{row.original.totalWords || 0}</span>,
  },
  {
    accessorKey: "description",
    header: "Mô tả",
    cell: ({ row }) => (
      <span className="text-slate-500 truncate max-w-[200px] block">
        {row.original.description || "Chưa có mô tả"}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Thao tác</div>,
    cell: ({ row }) => {
      const topic = row.original;

      return (
        <div className="text-right">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-40 p-1">
              <div className="flex flex-col gap-1">
                <Button 
                  variant="ghost" 
                  className="justify-start gap-2 h-9 text-sm"
                  onClick={() => onAction('view', topic)}
                >
                  <Eye className="w-4 h-4 text-blue-500" /> Xem
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start gap-2 h-9 text-sm"
                  onClick={() => onAction('edit', topic)}
                >
                  <Edit className="w-4 h-4 text-amber-500" /> Sửa
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start gap-2 h-9 text-sm text-red-600 hover:text-red-600 hover:bg-red-50"
                  onClick={() => onAction('delete', topic)}
                >
                  <Trash2 className="w-4 h-4" /> Xóa
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
];