/* eslint-disable react-hooks/set-state-in-effect */
'use client';
import { Check, Send, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface EssayQuestionProps {
    question: {
        id: number;
        word: string;        // Từ tiếng Anh (đáp án đúng)
        meaning: string;     // Nghĩa tiếng Việt (câu hỏi)
        phonetic?: string;
        example?: string;
        image?: string;
    };
    onSubmit: (questionId: number, answer: string) => void;
    isSubmitting?: boolean;
    showResult?: boolean;
    isCorrect?: boolean;
    expectedAnswer?: string;
    currentNumber: number;
    totalQuestions: number;
}

export function EssayQuestion({
    question,
    onSubmit,
    isSubmitting = false,
    showResult = false,
    isCorrect = false,
    expectedAnswer = '',
    currentNumber,
    totalQuestions
}: EssayQuestionProps) {
    const [answer, setAnswer] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // Tự động focus vào input khi hiển thị câu hỏi mới
    useEffect(() => {
        if (!showResult && inputRef.current) {
            inputRef.current.focus();
        }
    }, [question.id, showResult]);

    // Reset answer khi câu hỏi thay đổi
    useEffect(() => {
        setAnswer('');
    }, [question.id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (answer.trim() && !isSubmitting && !showResult) {
            onSubmit(question.id, answer.trim());
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && answer.trim() && !isSubmitting && !showResult) {
            handleSubmit(e);
        }
    };

    return (
        <div className="mt-8">
            {/* Progress indicator */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full mb-4">
                <span>✍️ Câu {currentNumber}/{totalQuestions}</span>
            </div>

            {/* Question */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-3">
                    Viết từ tiếng Anh cho nghĩa sau:
                </h2>
                <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
                    <p className="text-3xl font-semibold text-indigo-900 text-center">
                        {question.meaning}
                    </p>
                    {question.phonetic && !showResult && (
                        <p className="text-sm text-slate-500 font-mono text-center mt-2">
                            Gợi ý phiên âm: {question.phonetic}
                        </p>
                    )}
                </div>
            </div>



            {/* Input form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Câu trả lời của bạn:
                    </label>
                    <input
                        ref={inputRef}
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isSubmitting || showResult}
                        placeholder="Nhập từ tiếng Anh..."
                        className={`
                            w-full px-5 py-4 text-lg rounded-xl border-2 
                            focus:outline-none focus:ring-2 transition-all
                            ${showResult
                                ? isCorrect
                                    ? 'border-green-400 bg-green-50 ring-green-200'
                                    : 'border-red-400 bg-red-50 ring-red-200'
                                : 'border-slate-200 focus:border-indigo-400 focus:ring-indigo-200'
                            }
                        `}
                        autoComplete="off"
                    />
                </div>

                {/* Show result feedback */}
                {showResult && (
                    <div className={`p-4 rounded-xl flex items-start gap-3 ${isCorrect
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-red-50 border border-red-200'
                        }`}>
                        {isCorrect ? (
                            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        ) : (
                            <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        )}
                        <div>
                            <p className={`font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'
                                }`}>
                                {isCorrect ? '🎉 Chính xác!' : '❌ Chưa đúng!'}
                            </p>
                            {!isCorrect && (
                                <p className="text-slate-700 mt-1">
                                    Đáp án đúng là: <span className="font-bold text-indigo-600">{expectedAnswer}</span>
                                </p>
                            )}
                            {question.example && (
                                <p className="text-sm text-slate-500 mt-2 italic">
                                    📖 Ví dụ: {question.example}
                                </p>
                            )}
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={!answer.trim() || isSubmitting || showResult}
                    className={`
                        w-full py-4 rounded-xl font-bold text-white transition-all
                        flex items-center justify-center gap-2
                        ${!answer.trim() || isSubmitting || showResult
                            ? 'bg-slate-300 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200'
                        }
                    `}
                >
                    <Send className="w-5 h-5" />
                    {showResult ? 'Đã kiểm tra' : 'Kiểm tra (Enter)'}
                </button>
            </form>

            {/* Hint */}
            {!showResult && (
                <p className="text-xs text-slate-400 text-center mt-4">
                    💡 Gợi ý: Nhấn Enter để kiểm tra kết quả
                </p>
            )}
        </div>
    );
}