'use client';
import { ArrowLeft, CheckCircle, Loader2, RotateCcw, XCircle } from 'lucide-react';
import Link from 'next/link';
import { EssayQuestion } from './essay-question';
import { useEssayVocab } from './useEssayVocab';

interface Props {
    topic: string;
}

export default function ContainerEssayVocab({ topic }: Props) {
    const {
        loading,
        currentQuestion,
        currentIndex,
        totalQuestions,
        answeredCount,
        correctCount,
        currentFeedback,
        showResults,
        isSubmitting,
        handleSubmitAnswer,
        handlePrevious,
        handleRestart,
        userAnswers,
        answerStatus,
        questions
    } = useEssayVocab(topic);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                <p className="text-slate-500 font-medium">Đang chuẩn bị câu hỏi...</p>
            </div>
        );
    }

    if (showResults) {
        const score = Math.round((correctCount / totalQuestions) * 100);
        return (
            <div className="py-8 px-4 max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 text-center">
                    <div className="mb-6">
                        {score >= 80 ? (
                            <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-12 h-12 text-green-600" />
                            </div>
                        ) : (
                            <div className="w-24 h-24 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
                                <div className="text-4xl">📚</div>
                            </div>
                        )}
                    </div>

                    <h2 className="text-2xl font-bold mb-2">Kết quả của bạn</h2>
                    <p className="text-slate-500 mb-6">Bạn đã hoàn thành {totalQuestions} câu hỏi</p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="p-4 bg-green-50 rounded-xl">
                            <p className="text-3xl font-bold text-green-600">{correctCount}</p>
                            <p className="text-sm text-green-700">Đúng</p>
                        </div>
                        <div className="p-4 bg-red-50 rounded-xl">
                            <p className="text-3xl font-bold text-red-600">{totalQuestions - correctCount}</p>
                            <p className="text-sm text-red-700">Sai</p>
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <div className="text-5xl font-bold mb-2">
                            {score}%
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-3">
                            <div
                                className={`h-3 rounded-full transition-all ${score >= 70 ? 'bg-green-500' : 'bg-orange-500'}`}
                                style={{ width: `${score}%` }}
                            />
                        </div>
                        <p className="mt-3 text-slate-500">
                            {score >= 80 ? '🎉 Xuất sắc! Bạn đã nắm vững từ vựng.' :
                                score >= 60 ? '👍 Khá tốt! Cố gắng ôn lại những từ sai.' :
                                    '💪 Cố gắng hơn nữa! Học lại và thử lại nhé.'}
                        </p>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={handleRestart}
                            className="px-6 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-2"
                        >
                            <RotateCcw className="w-4 h-4" /> Làm lại
                        </button>
                        <Link
                            href="/admin/test-vocabs"
                            className="px-6 py-3 rounded-xl border border-slate-200 hover:bg-slate-50"
                        >
                            Chọn chủ đề khác
                        </Link>
                    </div>

                    {/* Danh sách câu trả lời */}
                    <div className="mt-8 text-left border-t pt-6">
                        <h3 className="font-semibold mb-4">Chi tiết câu trả lời:</h3>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                            {questions.map((q, idx) => {
                                const isCorrect = answerStatus[q.id];
                                const userAnswer = userAnswers[q.id];
                                return (
                                    <div key={q.id} className="p-3 bg-slate-50 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            {isCorrect ? (
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                            ) : (
                                                <XCircle className="w-4 h-4 text-red-500" />
                                            )}
                                            <span className="font-medium">{q.meaning}</span>
                                            <span className="text-slate-400">→</span>
                                            <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                                                {userAnswer || '(chưa trả lời)'}
                                            </span>
                                            {!isCorrect && (
                                                <span className="text-sm text-slate-500">
                                                    (Đúng: {q.word})
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-8 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
                    {/* Header */}
                    <div className="mb-6 text-center">
                        <h1 className="text-2xl font-bold mb-2 text-indigo-900">✍️ Luyện Tập Tự Luận</h1>
                        <p className="text-muted-foreground">Nhập từ tiếng Anh dựa vào nghĩa tiếng Việt</p>
                    </div>

                    {/* Stats */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex gap-4">
                            <div className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                                ✅ Đã làm: {answeredCount}/{totalQuestions}
                            </div>
                            <div className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                                🎯 Đúng: {correctCount}
                            </div>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mb-6">
                        <div className="w-full bg-slate-100 rounded-full h-2">
                            <div
                                className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Question */}
                    {currentQuestion && (
                        <EssayQuestion
                            question={currentQuestion}
                            onSubmit={handleSubmitAnswer}
                            isSubmitting={isSubmitting}
                            showResult={currentFeedback.show}
                            isCorrect={currentFeedback.isCorrect}
                            expectedAnswer={currentFeedback.expectedAnswer}
                            currentNumber={currentIndex + 1}
                            totalQuestions={totalQuestions}
                        />
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between items-center mt-8 pt-6 border-t">
                        <button
                            onClick={handlePrevious}
                            disabled={currentIndex === 0}
                            className="px-6 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-50 transition-all flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" /> Câu trước
                        </button>

                        <button
                            onClick={handleRestart}
                            className="px-6 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-2"
                        >
                            <RotateCcw className="w-4 h-4" /> Làm lại
                        </button>
                    </div>

                    {/* Note */}
                    <div className="mt-6 p-3 bg-amber-50 rounded-lg text-sm text-amber-700">
                        💡 Lưu ý: Nhấn Enter để kiểm tra. Nếu đúng sẽ tự động sang câu tiếp theo.
                        Nếu sai, bạn có thể nhập lại đến khi đúng.
                    </div>
                </div>
            </div>
        </div>
    );
}