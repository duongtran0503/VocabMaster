'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FormAddTopic from "@/app/(dashboard)/admin/_components/topics-table/form-add-topic";


export default function TableToolbar() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    
    // Lấy giá trị search từ URL ban đầu nếu có
    const [searchValue, setSearchValue] = useState(searchParams.get('search') || "");

    // Xử lý Debounce Search: Đợi người dùng dừng gõ 500ms mới cập nhật URL
    useEffect(() => {
        const currentSearch = searchParams.get('search') || "";
        
        if (searchValue === currentSearch) return;
        const delayDebounceFn = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (searchValue) {
                params.set('search', searchValue);
                params.set('page', '1'); // Reset về trang 1 khi tìm kiếm
            } else {
                params.delete('search');
            }
            router.push(`${pathname}?${params.toString()}`);
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchValue, pathname, router, searchParams]);

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="relative w-full sm:max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                    placeholder="Tìm kiếm tên chủ đề..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="pl-10 pr-10 h-10 border-slate-200 focus-visible:ring-primary rounded-xl"
                />
                {searchValue && (
                    <button 
                        onClick={() => setSearchValue("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <X className="h-3 w-3 text-slate-500" />
                    </button>
                )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button 
                    onClick={()=>setIsOpen(true)}
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white gap-2 h-10 px-5 rounded-xl shadow-md shadow-primary/20 transition-all active:scale-95"
                >
                    <Plus className="h-4 w-4" />
                    Thêm chủ đề
                </Button>
            </div>
            <FormAddTopic isOpen={isOpen} onClose={() => setIsOpen(false)} />

        </div>
    );
}