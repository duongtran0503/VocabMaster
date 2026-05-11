'use client';
import { useTestVocab } from '@/app/(dashboard)/admin/_components/container-test-vocab/action';
import { QuizProgress } from '@/app/(dashboard)/admin/_components/quiz/quiz-process';
import { QuizQuestion } from '@/app/(dashboard)/admin/_components/quiz/quiz-question';
import { QuizResult } from '@/app/(dashboard)/admin/_components/quiz/quiz-result';
import { Check, Loader2 } from 'lucide-react';
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
        handleSelectAnswer,
        handleNext,
        handlePrevious,
        handleSubmit,
        handleRestart,
        calculateScore,
    } = useTestVocab(props.topic);

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

                    <QuizProgress
                        current={currentQuestionIndex + 1}
                        total={totalQuestions}
                        answered={answeredCount}
                    />

                    {currentQuestion && (
                        <QuizQuestion
                            question={currentQuestion}
                            selectedAnswer={selectedAnswers[currentQuestion.id]}
                            onSelectAnswer={handleSelectAnswer}
                            questionNumber={currentQuestionIndex + 1}
                        />
                    )}

                    <div className="flex justify-between items-center mt-8 pt-6 border-t">
                        <button
                            onClick={handlePrevious}
                            disabled={currentQuestionIndex === 0}
                            className="px-6 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-50 transition-all font-medium"
                        >
                            Câu trước
                        </button>

                        <div className="flex gap-3">
                            {currentQuestionIndex === totalQuestions - 1 ? (
                                <button
                                    onClick={handleSubmit}
                                    disabled={answeredCount < totalQuestions}
                                    className="px-8 py-2.5 rounded-xl bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 transition-all flex items-center gap-2 font-bold shadow-lg shadow-green-100"
                                >
                                    <Check className="w-5 h-5" /> Nộp bài
                                </button>
                            ) : (
                                <button
                                    onClick={handleNext}
                                    disabled={!selectedAnswers[currentQuestion?.id]}
                                    className="px-8 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-slate-200 transition-all font-bold shadow-lg"
                                >
                                    Tiếp theo
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center gap-6 py-3 px-6 bg-slate-50 rounded-2xl text-sm font-medium">
                        <span className="text-green-600">Hoàn thành: {answeredCount}</span>
                        <span className="text-amber-500">Còn lại: {totalQuestions - answeredCount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}