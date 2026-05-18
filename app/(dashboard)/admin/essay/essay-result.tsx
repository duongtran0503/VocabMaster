'use client';
import { CheckCircle, Home, RotateCcw, XCircle } from 'lucide-react';
import Link from 'next/link';

interface EssayResultProps {
    score: number;
    correctCount: number;
    totalQuestions: number;
    onRestart: () => void;
    questions: Array<{
        id: number;
        word: string;
        meaning: string;
    }>;
    userAnswers: Record<number, string>;
    answerStatus: Record<number, boolean>;
}

export function EssayResult({
    score,
    correctCount,
    totalQuestions,
    onRestart,
    questions,
    userAnswers,
    answerStatus
}: EssayResultProps) {
    const getScoreColor = () => {
        if (score >= 80) return 'text-green-600';
        if (score >= 60) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getScoreMessage = () => {
        if (score >= 80) return '🎉 Xuất sắc! Bạn đã nắm vững từ vựng.';
        if (score >= 60) return '👍 Khá tốt! Cố gắng ôn lại những từ sai.';
        if (score >= 40) return '📚 Cố gắng hơn nữa! Học lại và thử lại nhé.';
        return '💪 Đừng nản! Hãy học lại từ đầu và thử lại.';
    };

    return (
        <div className="py-8 px-4 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="mb-4">
                        {score >= 80 ? (
                            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-10 h-10 text-green-600" />
                            </div>
                        ) : score >= 60 ? (
                            <div className="w-20 h-20 mx-auto bg-yellow-100 rounded-full flex items-center justify-center">
                                <div className="text-3xl">👍</div>
                            </div>
                        ) : (
                            <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                                <div className="text-3xl">📚</div>
                            </div>
                        )}
                    </div>

                    <h2 className="text-2xl font-bold text-slate-800 mb-2">
                        Kết quả bài làm
                    </h2>
                    <p className="text-slate-500">
                        Bạn đã hoàn thành {totalQuestions} câu hỏi tự luận
                    </p>
                </div>

                {/* Score Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-xl text-center">
                        <p className="text-3xl font-bold text-indigo-600">{totalQuestions}</p>
                        <p className="text-sm text-indigo-700 font-medium">Tổng số câu</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl text-center">
                        <p className="text-3xl font-bold text-green-600">{correctCount}</p>
                        <p className="text-sm text-green-700 font-medium">Trả lời đúng</p>
                    </div>
                    <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl text-center">
                        <p className="text-3xl font-bold text-red-600">{totalQuestions - correctCount}</p>
                        <p className="text-sm text-red-700 font-medium">Trả lời sai</p>
                    </div>
                </div>

                {/* Score Circle */}
                <div className="text-center mb-8">
                    <div className="relative inline-block">
                        <svg className="w-32 h-32 transform -rotate-90">
                            <circle
                                className="text-slate-100"
                                strokeWidth="8"
                                stroke="currentColor"
                                fill="transparent"
                                r="58"
                                cx="64"
                                cy="64"
                            />
                            <circle
                                className={getScoreColor()}
                                strokeWidth="8"
                                strokeDasharray={2 * Math.PI * 58}
                                strokeDashoffset={2 * Math.PI * 58 * (1 - score / 100)}
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="transparent"
                                r="58"
                                cx="64"
                                cy="64"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className={`text-3xl font-bold ${getScoreColor()}`}>
                                {Math.round(score)}%
                            </span>
                        </div>
                    </div>
                    <p className="mt-4 text-slate-600 font-medium">
                        {getScoreMessage()}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center mb-8">
                    <button
                        onClick={onRestart}
                        className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-all flex items-center gap-2 font-medium shadow-md"
                    >
                        <RotateCcw className="w-4 h-4" /> Làm lại
                    </button>
                    <Link
                        href="/admin/test-vocabs"
                        className="px-6 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-2 font-medium"
                    >
                        <Home className="w-4 h-4" /> Chọn chủ đề khác
                    </Link>
                </div>

                {/* Detailed Answers */}
                <div className="border-t pt-6">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <span className="text-lg">📋</span> Chi tiết câu trả lời
                    </h3>
                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                        {questions.map((question, idx) => {
                            const isCorrect = answerStatus[question.id];
                            const userAnswer = userAnswers[question.id] || '(chưa trả lời)';

                            return (
                                <div
                                    key={question.id}
                                    className={`p-4 rounded-xl border transition-all ${isCorrect
                                        ? 'bg-green-50 border-green-200'
                                        : 'bg-red-50 border-red-200'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        {/* Status Icon */}
                                        <div className="flex-shrink-0">
                                            {isCorrect ? (
                                                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                                            ) : (
                                                <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-baseline gap-2 mb-1">
                                                <span className="text-sm font-semibold text-slate-500">
                                                    Câu {idx + 1}:
                                                </span>
                                                <span className="text-base font-medium text-slate-700">
                                                    {question.meaning}
                                                </span>
                                            </div>

                                            <div className="mt-2 space-y-1">
                                                <div className="text-sm">
                                                    <span className="text-slate-500">Bạn trả lời: </span>
                                                    <span className={`font-mono ${isCorrect ? 'text-green-700' : 'text-red-700'
                                                        }`}>
                                                        {userAnswer}
                                                    </span>
                                                </div>

                                                {!isCorrect && (
                                                    <div className="text-sm">
                                                        <span className="text-slate-500">Đáp án đúng: </span>
                                                        <span className="font-mono font-bold text-indigo-600">
                                                            {question.word}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Encouragement Footer */}
                <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
                    <p className="text-sm text-amber-700 text-center">
                        💪 {correctCount === totalQuestions
                            ? 'Hoàn hảo! Bạn đã thành thạo chủ đề này!'
                            : `Hãy ôn lại ${totalQuestions - correctCount} từ sai và thử lại nhé!`}
                    </p>
                </div>
            </div>
        </div>
    );
}