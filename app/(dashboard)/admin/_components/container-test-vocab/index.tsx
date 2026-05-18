'use client';
import { useTestVocab } from '@/app/(dashboard)/admin/_components/container-test-vocab/action';
import { QuizProgress } from '@/app/(dashboard)/admin/_components/quiz/quiz-process';
import { QuizQuestion } from '@/app/(dashboard)/admin/_components/quiz/quiz-question';
import { QuizResult } from '@/app/(dashboard)/admin/_components/quiz/quiz-result';
import { Check, Loader2, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
    topic: string
}

export default function ContainerTestVocab(props: Props) {
    const {
        loading,
        quizData,
        currentQuestion,
        currentQuestionIndex,
        totalQuestions,
        answeredCount,
        selectedAnswers,
        showResults,
        handleSelectAnswer, // Thêm vào từ useTestVocab
        handleNext,
        handlePrevious,
        handleSubmit,
        handleRestart,
        calculateScore,
    } = useTestVocab(props.topic);

    const [feedback, setFeedback] = useState<{ show: boolean; isCorrect: boolean; message: string }>({
        show: false,
        isCorrect: false,
        message: ''
    });

    const [autoNextTimeout, setAutoNextTimeout] = useState<NodeJS.Timeout | null>(null);

    // Xử lý khi chọn đáp án
    const handleAnswerSelection = (questionId: number, optionLabel: string) => {
        // Tìm câu hỏi và đáp án đã chọn
        const question = quizData.find(q => q.id === questionId);
        const selectedOption = question?.options.find(opt => opt.label === optionLabel);

        if (selectedOption) {
            const isCorrect = selectedOption.isCorrect;

            // Hiển thị feedback
            setFeedback({
                show: true,
                isCorrect: isCorrect,
                message: isCorrect ? '🎉 Chính xác!' : `❌ Sai rồi! Đáp án đúng là: ${question?.options.find(opt => opt.isCorrect)?.text}`
            });

            // Gọi hàm chọn đáp án từ hook
            handleSelectAnswer(questionId, optionLabel);

            // Clear timeout cũ nếu có
            if (autoNextTimeout) clearTimeout(autoNextTimeout);

            // Tự động chuyển sang câu tiếp theo sau 1 giây
            const timeout = setTimeout(() => {
                setFeedback({ show: false, isCorrect: false, message: '' });

                // Nếu chưa phải câu cuối thì chuyển tiếp
                if (currentQuestionIndex < totalQuestions - 1) {
                    handleNext();
                }
            }, 800);

            setAutoNextTimeout(timeout);
        }
    };

    // Cleanup timeout khi component unmount hoặc khi chuyển câu
    useEffect(() => {
        return () => {
            if (autoNextTimeout) clearTimeout(autoNextTimeout);
        };
    }, [autoNextTimeout]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                <p className="text-slate-500 font-medium">Đang chuẩn bị câu hỏi...</p>
            </div>
        );
    }

    if (showResults) {
        return (
            <QuizResult
                score={calculateScore()}
                total={totalQuestions}
                onRestart={handleRestart}
                quizData={quizData}
                selectedAnswers={selectedAnswers}
            />
        );
    }

    return (
        <div className="py-8 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
                    <div className="mb-6 text-center">
                        <h1 className="text-2xl font-bold mb-2 text-indigo-900">Luyện Tập Từ Vựng</h1>
                        <p className="text-muted-foreground">Kiểm tra kiến thức từ vựng của bạn</p>
                    </div>

                    {/* Hiển thị số câu đã làm */}
                    <div className="mb-4 text-center">
                        <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full">
                            📝 Đã làm: {answeredCount}/{totalQuestions}
                        </span>
                    </div>

                    <QuizProgress
                        current={currentQuestionIndex + 1}
                        total={totalQuestions}
                        answered={answeredCount}
                    />

                    {/* Thông báo kết quả */}
                    {feedback.show && (
                        <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200 ${feedback.isCorrect
                            ? 'bg-green-50 border border-green-200 text-green-700'
                            : 'bg-red-50 border border-red-200 text-red-700'
                            }`}>
                            {feedback.isCorrect ? (
                                <Check className="w-5 h-5 text-green-600" />
                            ) : (
                                <X className="w-5 h-5 text-red-600" />
                            )}
                            <span className="font-medium">{feedback.message}</span>
                        </div>
                    )}

                    {currentQuestion && (
                        <QuizQuestion
                            question={currentQuestion}
                            selectedAnswer={selectedAnswers[currentQuestion.id]}
                            onSelectAnswer={handleAnswerSelection}
                            questionNumber={currentQuestionIndex + 1}
                            disabled={feedback.show}
                            showResult={feedback.show}
                        />
                    )}

                    <div className="flex justify-between items-center mt-8 pt-6 border-t">
                        <button
                            onClick={handlePrevious}
                            disabled={currentQuestionIndex === 0 || feedback.show}
                            className="px-6 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-transparent transition-all font-medium"
                        >
                            ◀ Câu trước
                        </button>

                        <div className="flex gap-3">
                            {currentQuestionIndex === totalQuestions - 1 ? (
                                <button
                                    onClick={handleSubmit}
                                    disabled={answeredCount < totalQuestions || feedback.show}
                                    className="px-8 py-2.5 rounded-xl bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 transition-all flex items-center gap-2 font-bold shadow-lg shadow-green-100"
                                >
                                    <Check className="w-5 h-5" /> Nộp bài
                                </button>
                            ) : (
                                <button
                                    onClick={handleNext}
                                    disabled={!selectedAnswers[currentQuestion?.id] || feedback.show}
                                    className="px-8 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-slate-200 disabled:hover:bg-slate-200 transition-all font-bold shadow-lg"
                                >
                                    Tiếp theo ▶
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center gap-6 py-3 px-6 bg-slate-50 rounded-2xl text-sm font-medium">
                        <span className="text-green-600">✅ Hoàn thành: {answeredCount}</span>
                        <span className="text-amber-500">⏳ Còn lại: {totalQuestions - answeredCount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}