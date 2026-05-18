import { getSizeofTopic, TOPICS } from '@/lib/db';
import { BookOpen, ListChecks, PenTool } from 'lucide-react';
import Link from 'next/link';

export default function TestVocabTopicPage() {
    return (
        <div className="min-h-screen bg-slate-50/50 py-12 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
                        Chọn Chủ Đề Ôn Tập
                    </h1>
                    <p className="text-slate-500 max-w-md mx-auto">
                        Chọn một chủ đề và phương pháp học bạn muốn ôn tập.
                        Mỗi phương pháp sẽ giúp bạn ghi nhớ từ vựng hiệu quả hơn.
                    </p>
                </div>

                {/* Topics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {TOPICS.map((topic) => (
                        <div
                            key={topic.id}
                            className="group relative bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-300 overflow-hidden"
                        >
                            <div className="p-6">
                                <div className="flex items-start gap-5">
                                    {/* Icon Box */}
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-inner ${topic.color}`}>
                                        {topic.icon}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                                            {topic.title}
                                        </h3>
                                        <p className="text-slate-500 text-sm mt-1 line-clamp-2">
                                            {topic.description}
                                        </p>

                                        <div className="flex items-center gap-4 mt-3">
                                            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                                                <BookOpen className="w-4 h-4" />
                                                {getSizeofTopic(topic.id)} từ vựng
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Method Buttons */}
                            <div className="border-t border-slate-100 bg-slate-50/50 p-3 flex gap-3">
                                {/* Trắc nghiệm button */}
                                <Link
                                    href={`/admin/test-vocabs/${topic.id}`}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-200 text-sm font-semibold shadow-sm"
                                >
                                    <ListChecks className="w-4 h-4" />
                                    Trắc nghiệm
                                </Link>

                                {/* Tự luận button */}
                                <Link
                                    href={`/admin/essay/${topic.id}`}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-all duration-200 text-sm font-semibold shadow-sm"
                                >
                                    <PenTool className="w-4 h-4" />
                                    Tự luận
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Comparison Section */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Trắc nghiệm card */}
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                <ListChecks className="w-5 h-5 text-indigo-600" />
                            </div>
                            <h3 className="font-bold text-slate-800">📝 Trắc nghiệm</h3>
                        </div>
                        <p className="text-sm text-slate-500">
                            Chọn đáp án đúng từ 4 lựa chọn. Phù hợp để kiểm tra nhanh và rèn luyện phản xạ.
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                            <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full">✅ 4 lựa chọn</span>
                            <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full">⚡ Kiểm tra nhanh</span>
                        </div>
                    </div>

                    {/* Tự luận card */}
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                <PenTool className="w-5 h-5 text-emerald-600" />
                            </div>
                            <h3 className="font-bold text-slate-800">✍️ Tự luận</h3>
                        </div>
                        <p className="text-sm text-slate-500">
                            Nhập từ tiếng Anh dựa vào nghĩa tiếng Việt. Giúp ghi nhớ sâu và luyện kỹ năng viết.
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                            <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full">⌨️ Nhập đáp án</span>
                            <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full">🎯 Ghi nhớ sâu</span>
                        </div>
                    </div>
                </div>

                {/* Footer Tip */}
                <div className="mt-8 p-6 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center gap-4">
                    <div className="bg-white p-2 rounded-lg shadow-sm font-bold text-indigo-600">💡 Tip!</div>
                    <p className="text-sm text-indigo-700 font-medium">
                        Nên kết hợp cả hai phương pháp: dùng <strong className="font-bold">Trắc nghiệm</strong> để kiểm tra nhanh và
                        <strong className="font-bold"> Tự luận</strong> để ghi nhớ từ vựng lâu hơn! 🚀
                    </p>
                </div>
            </div>
        </div>
    );
}