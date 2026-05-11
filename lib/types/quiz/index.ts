export interface QuizOption {
    label: string;
    text: string;
    isCorrect: boolean;
}

export interface QuizItem {
    id: number;
    question: string;
    options: QuizOption[];
    phonetic?: string;
}