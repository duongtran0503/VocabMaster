'use client';

import useTopicsTable from "./use-topics-table";
import { PaginationType } from "@/lib/types/api";
import { TopicType } from "@/lib/types/topic";
import { columns } from "./columns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Shadcn UI components
import { 
  flexRender, 
  getCoreRowModel, 
  useReactTable 
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import TableToolbar from "@/app/(dashboard)/admin/_components/topics-table/table-toolbar";
import { useRouter } from "next/navigation";

interface TopicsTableProps {
    pagination: PaginationType;
    initialData: TopicType[];
}

export default function TopicsTable({ initialData, pagination: initialPagination }: TopicsTableProps) {
    const router  = useRouter();
    const { data, pagination, setPage, isLoading } = useTopicsTable({ 
        data: initialData, 
        pagination: initialPagination 
    });

    const handleAction = (type: string, topic: TopicType) => {
        console.log(`Action: ${type} on Topic:`, topic.name);
        if(type === "view") {
            router.push(`/admin/topics/${topic._id}`);
        } else if(type === "edit") {
            // Xử lý chỉnh sửa topic
        } else if(type === "delete") {
            // Xử lý xóa topic
        }
    };

    const table = useReactTable({
        data,
        columns: columns(pagination.currentPage, pagination.itemPerPage, handleAction),
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="space-y-4">
             <div>
                <TableToolbar  />
             </div>
            <div className="rounded-xl border border-slate-100 bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50/50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="hover:bg-transparent">
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="text-[13px] font-semibold text-slate-600 h-12">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                           <TableRow><TableCell colSpan={6} className="h-24 text-center">Đang tải...</TableCell></TableRow>
                        ) : data.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} className="hover:bg-slate-50/30 border-b border-slate-50">
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="py-3">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow><TableCell colSpan={6} className="h-24 text-center">Không có dữ liệu.</TableCell></TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-2">
                <p className="text-sm text-slate-500 font-sans">
                    Tổng số: <span className="font-semibold text-slate-900">{pagination.totalItem}</span> chủ đề
                </p>
                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">Trang {pagination.currentPage} / {pagination.totalPage}</span>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-lg"
                            disabled={!pagination.hasPrev}
                            onClick={() => setPage( pagination.currentPage - 1)}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-lg"
                            disabled={!pagination.hasNext}
                            onClick={() => setPage(pagination.currentPage + 1)}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}