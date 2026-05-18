/* eslint-disable react-hooks/set-state-in-effect */
import { generateQuizFromVocabs, getMockVocabularies } from '@/lib/db';
import { QuizItem, QuizOption } from '@/lib/types/quiz';
import { useEffect, useState } from 'react';

export function useTestVocab(topic: string) {
    const [quizData, setQuizData] = useState<QuizItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
    const [showResults, setShowResults] = useState(false);

    const initQuiz = () => {
        try {
            setLoading(true);
            const vocabs = getMockVocabularies(topic);
            const generatedQuestions = generateQuizFromVocabs(vocabs);
            setQuizData(generatedQuestions);
        } catch (error) {
            console.error("Lỗi khởi tạo bài tập:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        initQuiz();
    }, [topic]); // Thêm topic vào dependency

    const currentQuestion = quizData[currentQuestionIndex];
    const totalQuestions = quizData.length;
    const answeredCount = Object.keys(selectedAnswers).length;

    // SỬA: Nhận cả questionId và optionLabel
    const handleSelectAnswer = (questionId: number, optionLabel: string) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: optionLabel,
        }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleSubmit = () => setShowResults(true);

    const handleRestart = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        setShowResults(false);
        initQuiz();
    };

    const calculateScore = () => {
        let correct = 0;
        quizData.forEach((question) => {
            const selectedLabel = selectedAnswers[question.id];
            const selectedOption = question.options.find((opt: QuizOption) => opt.label === selectedLabel);
            if (selectedOption?.isCorrect) correct++;
        });
        return correct;
    };

    return {
        quizData,
        loading,
        currentQuestion,
        currentQuestionIndex,
        totalQuestions,
        answeredCount,
        selectedAnswers,
        showResults,
        handleSelectAnswer, // Giờ đã nhận 2 tham số
        handleNext,
        handlePrevious,
        handleSubmit,
        handleRestart,
        calculateScore,
    };
}