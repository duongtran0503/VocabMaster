/* eslint-disable react-hooks/set-state-in-effect */
import { getMockVocabularies } from '@/lib/db';
import { VocabType } from '@/lib/types/vocab';
import { useCallback, useEffect, useRef, useState } from 'react';

interface EssayQuestionType {
    id: number;
    word: string;
    meaning: string;
    phonetic?: string;
    example?: string;
    image?: string;
}

export function useEssayVocab(topic: string) {
    const [questions, setQuestions] = useState<EssayQuestionType[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
    const [answerStatus, setAnswerStatus] = useState<Record<number, boolean>>({});
    const [currentFeedback, setCurrentFeedback] = useState<{
        show: boolean;
        isCorrect: boolean;
        expectedAnswer: string;
    }>({ show: false, isCorrect: false, expectedAnswer: '' });
    const [showResults, setShowResults] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Dùng ref để tránh gọi nhiều lần
    const isMounted = useRef(true);
    const initCalled = useRef(false);

    const initQuestions = useCallback(() => {
        // Chỉ gọi một lần
        if (initCalled.current) return;
        initCalled.current = true;

        try {
            setLoading(true);
            const vocabs = getMockVocabularies(topic);
            console.log("Loaded vocabs for topic", topic, vocabs); // Kiểm tra dữ liệu

            // Kiểm tra dữ liệu
            if (!vocabs || vocabs.length === 0) {
                console.error("Không có dữ liệu từ vựng cho topic:", topic);
                setQuestions([]);
                setLoading(false);
                return;
            }

            const essayQuestions = vocabs.map((v: VocabType, index: number) => ({
                id: index + 1,
                word: v.word,
                meaning: v.meaning,
                phonetic: v.phonetic,
                example: v.example,
                image: v.image,
            }));

            if (isMounted.current) {
                setQuestions(essayQuestions);
            }
        } catch (error) {
            console.error("Lỗi khởi tạo bài tập:", error);
            if (isMounted.current) {
                setQuestions([]);
            }
        } finally {
            if (isMounted.current) {
                setLoading(false);
            }
        }
    }, [topic]);

    useEffect(() => {
        isMounted.current = true;
        initCalled.current = false;
        initQuestions();

        // Cleanup function
        return () => {
            isMounted.current = false;
        };
    }, [initQuestions]);

    const currentQuestion = questions[currentIndex];
    const totalQuestions = questions.length;
    const answeredCount = Object.keys(userAnswers).length;
    const correctCount = Object.values(answerStatus).filter(status => status === true).length;

    const handleSubmitAnswer = useCallback((questionId: number, answer: string) => {
        if (isSubmitting) return;

        const question = questions.find(q => q.id === questionId);
        if (!question) return;

        setIsSubmitting(true);

        const normalizedAnswer = answer.trim().toLowerCase();
        const normalizedCorrect = question.word.trim().toLowerCase();
        const isCorrect = normalizedAnswer === normalizedCorrect;

        // Lưu câu trả lời
        setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
        setAnswerStatus(prev => ({ ...prev, [questionId]: isCorrect }));

        // Hiển thị feedback
        setCurrentFeedback({
            show: true,
            isCorrect: isCorrect,
            expectedAnswer: question.word
        });

        // Nếu đúng, tự động chuyển câu sau 1.2s
        if (isCorrect) {
            setTimeout(() => {
                setCurrentFeedback({ show: false, isCorrect: false, expectedAnswer: '' });
                if (currentIndex < totalQuestions - 1) {
                    setCurrentIndex(prev => prev + 1);
                }
                setIsSubmitting(false);
            }, 1200);
        } else {
            // Nếu sai, chỉ tắt feedback sau 2s nhưng không chuyển câu
            setTimeout(() => {
                setCurrentFeedback({ show: false, isCorrect: false, expectedAnswer: '' });
                setIsSubmitting(false);
                // Focus lại input
                const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                if (input) input.focus();
            }, 2000);
        }
    }, [questions, currentIndex, totalQuestions, isSubmitting]);

    const handleNext = useCallback(() => {
        if (currentIndex < totalQuestions - 1 && answerStatus[currentQuestion?.id]) {
            setCurrentIndex(prev => prev + 1);
        }
    }, [currentIndex, totalQuestions, answerStatus, currentQuestion]);

    const handlePrevious = useCallback(() => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    }, [currentIndex]);

    const handleSubmitAll = useCallback(() => {
        setShowResults(true);
    }, []);

    const handleRestart = useCallback(() => {
        setCurrentIndex(0);
        setUserAnswers({});
        setAnswerStatus({});
        setShowResults(false);
        setCurrentFeedback({ show: false, isCorrect: false, expectedAnswer: '' });
        // Reset init flag để có thể khởi tạo lại
        initCalled.current = false;
        initQuestions();
    }, [initQuestions]);

    return {
        questions,
        loading,
        currentQuestion,
        currentIndex,
        totalQuestions,
        answeredCount,
        correctCount,
        userAnswers,
        answerStatus,
        currentFeedback,
        showResults,
        isSubmitting,
        handleSubmitAnswer,
        handleNext,
        handlePrevious,
        handleSubmitAll,
        handleRestart,
    };
}