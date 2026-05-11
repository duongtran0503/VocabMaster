import { getSizeofTopic } from '@/lib/db';
import { BookOpen, ChevronRight } from 'lucide-react';
import Link from 'next/link';
const TOPICS = [
    {
        id: 'hobbies',
        title: 'Sở thích',
        description: 'Các từ vựng về sở thích và hoạt động giải trí.',
        icon: '🎨',
        count: 15,
        color: 'bg-blue-50 border-blue-200 text-blue-700'
    },

    {
        id: 'food',
        title: 'Ẩm thực',
        description: 'Các món ăn, cách nấu nướng và mùi vị.',
        icon: '🍜',
        count: 18,
        color: 'bg-orange-50 border-orange-200 text-orange-700'
    }
];
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
                        Chọn một chủ đề bạn muốn kiểm tra kiến thức ngay hôm nay.
                        Mỗi chủ đề sẽ bao gồm các câu hỏi trắc nghiệm ngẫu nhiên.
                    </p>
                </div>

                {/* Topics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {TOPICS.map((topic) => (
                        <Link
                            key={topic.id}
                            href={`/admin/test-vocabs/${topic.id}`}
                            className="group relative bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-300"
                        >
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

                                    <div className="flex items-center gap-4 mt-4">
                                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                                            <BookOpen className="w-4 h-4" />
                                            {getSizeofTopic(topic.id)} từ vựng
                                        </div>
                                        <div className="flex items-center gap-1 text-xs font-bold text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                            Bắt đầu học <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Footer Tip */}
                <div className="mt-12 p-6 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center gap-4">
                    <div className="bg-white p-2 rounded-lg shadow-sm font-bold text-indigo-600">Tip!</div>
                    <p className="text-sm text-indigo-700 font-medium">
                        Dương nên ôn tập ít nhất 15 phút mỗi ngày để đạt được trình độ B1 nhanh hơn nhé! 🚀
                    </p>
                </div>
            </div>
        </div>
    );
}