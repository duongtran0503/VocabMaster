import { Check, X } from 'lucide-react';

interface Option {
    label: string;
    text: string;
    isCorrect: boolean;
}

interface Question {
    id: number;
    question: string;
    options: Option[];
    phonetic?: string;
}

interface QuizQuestionProps {
    question: Question;
    selectedAnswer?: string;
    onSelectAnswer: (questionId: number, optionLabel: string) => void; // Đã sửa: nhận cả questionId
    questionNumber: number;
    disabled?: boolean; // Thêm prop disabled
    showResult?: boolean; // Thêm prop để biết có đang hiển thị kết quả không
}

export function QuizQuestion({
    question,
    selectedAnswer,
    onSelectAnswer,
    questionNumber,
    disabled = false,
    showResult = false
}: QuizQuestionProps) {
    const hasAnswered = !!selectedAnswer;

    return (
        <div className="mt-8">
            {/* Question Number Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full mb-4">
                <span>Câu {questionNumber}</span>
            </div>

            {/* Question Text */}
            <h2 className="mb-2 text-foreground text-xl font-semibold">
                {question.question}
            </h2>

            {/* Phonetic (nếu có) */}
            {question.phonetic && (
                <p className="mb-6 text-sm text-slate-500 font-mono">
                    /{question.phonetic}/
                </p>
            )}

            {/* Options */}
            <div className="space-y-3">
                {question.options.map((option) => {
                    const isSelected = selectedAnswer === option.label;
                    const isCorrectOption = option.isCorrect;

                    // Xác định style dựa trên trạng thái
                    let buttonStyle = "border-border bg-white hover:border-indigo-300 hover:bg-indigo-50/50";

                    if (hasAnswered || showResult) {
                        if (isCorrectOption) {
                            // Đáp án đúng - màu xanh
                            buttonStyle = "border-green-400 bg-green-50";
                        } else if (isSelected && !isCorrectOption) {
                            // Đáp án đã chọn nhưng sai - màu đỏ
                            buttonStyle = "border-red-400 bg-red-50";
                        } else if (isSelected && isCorrectOption) {
                            // Đáp án đã chọn và đúng - màu xanh đậm
                            buttonStyle = "border-green-500 bg-green-100";
                        } else {
                            // Các đáp án khác - mờ đi
                            buttonStyle = "border-border bg-white opacity-60";
                        }
                    } else if (isSelected) {
                        // Chưa có kết quả nhưng đã chọn
                        buttonStyle = "border-indigo-600 bg-indigo-50";
                    }

                    return (
                        <button
                            key={option.label}
                            onClick={() => {
                                if (!disabled && !hasAnswered) {
                                    onSelectAnswer(question.id, option.label);
                                }
                            }}
                            disabled={disabled || hasAnswered}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${buttonStyle}`}
                        >
                            <div className="flex items-center gap-4">
                                {/* Option Label Circle */}
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${hasAnswered || showResult
                                        ? isCorrectOption
                                            ? 'border-green-600 bg-green-600 text-white'
                                            : isSelected
                                                ? 'border-red-600 bg-red-600 text-white'
                                                : 'border-gray-300 bg-white text-gray-400'
                                        : isSelected
                                            ? 'border-indigo-600 bg-indigo-600 text-white'
                                            : 'border-gray-300 bg-white text-gray-600'
                                        }`}
                                >
                                    {option.label}
                                </div>

                                {/* Option Text */}
                                <span className={`flex-1 ${hasAnswered || showResult
                                    ? isCorrectOption
                                        ? 'text-green-800 font-medium'
                                        : isSelected
                                            ? 'text-red-800'
                                            : 'text-gray-500'
                                    : isSelected
                                        ? 'text-indigo-900 font-medium'
                                        : 'text-foreground'
                                    }`}>
                                    {option.text}
                                </span>

                                {/* Hiển thị icon đúng/sai khi đã có kết quả */}
                                {(hasAnswered || showResult) && isCorrectOption && (
                                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                                )}
                                {(hasAnswered || showResult) && isSelected && !isCorrectOption && (
                                    <X className="w-5 h-5 text-red-600 flex-shrink-0" />
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}