interface QuizProgressProps {
    current: number;
    total: number;
    answered: number;
}

export function QuizProgress({ current, total, answered }: QuizProgressProps) {
    const progressPercentage = (answered / total) * 100;

    return (
        <div className="mb-8">
            {/* Stats */}
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">
                        Câu hỏi: <span className="text-foreground">{current}/{total}</span>
                    </span>
                    <span className="text-muted-foreground">
                        Đã trả lời: <span className="text-foreground">{answered}/{total}</span>
                    </span>
                </div>
                <span className="text-indigo-600">
                    {Math.round(progressPercentage)}%
                </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full bg-linear-to-r from-indigo-500 to-indigo-600 transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                />
            </div>

            {/* Question Indicators */}
            <div className="flex gap-2 mt-4 flex-wrap">
                {Array.from({ length: total }, (_, i) => {
                    const questionNum = i + 1;
                    const isCurrent = questionNum === current;
                    const isAnswered = answered >= questionNum;

                    return (
                        <div
                            key={i}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all ${isCurrent
                                ? 'bg-indigo-600 text-white ring-2 ring-indigo-600 ring-offset-2'
                                : isAnswered
                                    ? 'bg-green-100 text-green-700 border border-green-300'
                                    : 'bg-gray-100 text-gray-500 border border-gray-300'
                                }`}
                        >
                            {questionNum}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
