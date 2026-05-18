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


        </div>
    );
}
