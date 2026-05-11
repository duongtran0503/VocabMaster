import Sidebar from "@/app/(dashboard)/admin/_components/silde-bar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='flex h-screen bg-[#fcfcfd] relative'>
            {/* Background Pattern - Đã đổi sang màu Primary nhẹ */}
            <div className='absolute -z-10 inset-0 overflow-hidden pointer-events-none opacity-[0.03]'>
                <div className='absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#6367FF]' />
                <div className='absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-[#6367FF]' />
            </div>

            {/* Sidebar Container */}
            <div className='w-64 flex-shrink-0'>
                <Sidebar />
            </div>

            {/* Main Content */}
            <main className='flex-1 flex flex-col overflow-hidden'>
                <div className='h-full overflow-y-auto p-8 scrollbar-hide'>
                    {children}
                </div>
            </main>
        </div>
    );
}