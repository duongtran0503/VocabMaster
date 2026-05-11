import { Check, RotateCcw, X } from 'lucide-react';

interface Option {
    label: string;
    text: string;
    isCorrect: boolean;
}

interface Question {
    id: number;
    question: string;
    options: Option[];
}

interface QuizResultProps {
    score: number;
    total: number;
    onRestart: () => void;
    quizData: Question[];
    selectedAnswers: Record<number, string>;
}

export function QuizResult({ score, total, onRestart, quizData, selectedAnswers }: QuizResultProps) {
    const percentage = Math.round((score / total) * 100);

    const getResultMessage = () => {
        if (percentage >= 80) return { text: 'Xuất sắc!', color: 'text-green-600' };
        if (percentage >= 60) return { text: 'Khá tốt!', color: 'text-blue-600' };
        if (percentage >= 40) return { text: 'Cần cố gắng thêm', color: 'text-orange-600' };
        return { text: 'Cần ôn tập nhiều hơn', color: 'text-red-600' };
    };

    const result = getResultMessage();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Score Card */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 text-white mb-4">
                            <div>
                                <div className="text-4xl font-bold">{score}</div>
                                <div className="text-sm">/{total}</div>
                            </div>
                        </div>
                        <h1 className={`mb-2 ${result.color}`}>{result.text}</h1>
                        <p className="text-muted-foreground mb-4">
                            Bạn đã trả lời đúng {score} câu trong tổng số {total} câu ({percentage}%)
                        </p>
                        <button
                            onClick={onRestart}
                            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center gap-2"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Làm lại
                        </button>
                    </div>

                    {/* Detailed Results */}
                    <div className="border-t border-border pt-6">
                        <h2 className="mb-6 text-foreground">Chi tiết kết quả</h2>
                        <div className="space-y-6">
                            {quizData.map((question, index) => {
                                const selectedLabel = selectedAnswers[question.id];
                                const selectedOption = question.options.find(opt => opt.label === selectedLabel);
                                const correctOption = question.options.find(opt => opt.isCorrect);
                                const isCorrect = selectedOption?.isCorrect;

                                return (
                                    <div
                                        key={question.id}
                                        className={`p-5 rounded-xl border-2 ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                                            }`}
                                    >
                                        <div className="flex items-start gap-3 mb-3">
                                            <div
                                                className={`w-8 h-8 rounded-full flex items-center justify-center ${isCorrect ? 'bg-green-600' : 'bg-red-600'
                                                    }`}
                                            >
                                                {isCorrect ? (
                                                    <Check className="w-5 h-5 text-white" />
                                                ) : (
                                                    <X className="w-5 h-5 text-white" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-foreground mb-3">
                                                    Câu {index + 1}: {question.question}
                                                </h3>

                                                {/* Show selected answer if incorrect */}
                                                {!isCorrect && selectedOption && (
                                                    <div className="mb-2 p-3 bg-red-100 border border-red-300 rounded-lg">
                                                        <span className="text-red-700">
                                                            Bạn chọn: <strong>{selectedOption.label}. {selectedOption.text}</strong>
                                                        </span>
                                                    </div>
                                                )}

                                                {/* Show correct answer */}
                                                <div className={`p-3 ${isCorrect ? 'bg-green-100 border border-green-300' : 'bg-white border border-green-400'} rounded-lg`}>
                                                    <span className="text-green-700">
                                                        Đáp án đúng: <strong>{correctOption?.label}. {correctOption?.text}</strong>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
