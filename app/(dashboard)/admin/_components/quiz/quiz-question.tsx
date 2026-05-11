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

interface QuizQuestionProps {
    question: Question;
    selectedAnswer?: string;
    onSelectAnswer: (optionLabel: string) => void;
    questionNumber: number;
}

export function QuizQuestion({ question, selectedAnswer, onSelectAnswer, questionNumber }: QuizQuestionProps) {
    return (
        <div className="mt-8">
            {/* Question Number Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full mb-4">
                <span>Câu {questionNumber}</span>
            </div>

            {/* Question Text */}
            <h2 className="mb-6 text-foreground">
                {question.question}
            </h2>

            {/* Options */}
            <div className="space-y-3">
                {question.options.map((option) => {
                    const isSelected = selectedAnswer === option.label;
                    return (
                        <button
                            key={option.label}
                            onClick={() => onSelectAnswer(option.label)}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${isSelected
                                    ? 'border-indigo-600 bg-indigo-50'
                                    : 'border-border bg-white hover:border-indigo-300 hover:bg-indigo-50/50'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                {/* Option Label Circle */}
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${isSelected
                                            ? 'border-indigo-600 bg-indigo-600 text-white'
                                            : 'border-gray-300 bg-white text-gray-600'
                                        }`}
                                >
                                    {option.label}
                                </div>

                                {/* Option Text */}
                                <span className={isSelected ? 'text-indigo-900' : 'text-foreground'}>
                                    {option.text}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
