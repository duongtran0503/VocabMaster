import a1 from "@/lib/db/a1.json";
import food from "@/lib/db/food.json";
import hobby from "@/lib/db/hobbies.json";
import { QuizItem, QuizOption } from "@/lib/types/quiz";
import { VocabType } from "@/lib/types/vocab";
function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
export const getMockVocabularies = (topic: string): VocabType[] => {
    let vocabData: VocabType[] = [];
    switch (topic) {
        case "hobbies":
            vocabData = hobby as VocabType[];
            break;
        case "food":
            vocabData = food as VocabType[];
            break;  // ← THÊM break ở đây
        case "a1":
            vocabData = a1 as VocabType[];
            break;
        default:
            vocabData = [];
            break;
    }
    return shuffleArray(vocabData);
}

export const getSizeofTopic = (topic: string): number => {
    switch (topic) {
        case "hobbies": return (hobby as VocabType[]).length;
        case "food": return (food as VocabType[]).length;
        case "a1": return (a1 as VocabType[]).length;
        default: return 0;
    }
}

export const generateQuizFromVocabs = (vocabs: VocabType[]): QuizItem[] => {
    return vocabs.map((v, index) => {
        const correctText = v.meaning;

        // Lấy 3 nghĩa khác làm đáp án sai
        const otherMeanings = vocabs
            .filter(item => item.word !== v.word)
            .map(item => item.meaning)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);

        const allOptions: QuizOption[] = [correctText, ...otherMeanings]
            .sort(() => 0.5 - Math.random())
            .map((text, i) => ({
                label: String.fromCharCode(65 + i),
                text: text,
                isCorrect: text === correctText
            }));

        return {
            id: index + 1,
            question: `Từ "${v.word}" có nghĩa là gì?`,
            phonetic: v.phonetic,
            options: allOptions
        };
    });
};

export const TOPICS = [
    {
        id: 'hobbies',
        title: 'Sở thích',
        description: 'Các từ vựng về sở thích và hoạt động giải trí.',
        icon: '🎨',
        count: 15,
        color: 'bg-blue-50 border-blue-200 text-blue-700'
    },
    {
        id: 'food',
        title: 'Ẩm thực',
        description: 'Các món ăn, cách nấu nướng và mùi vị.',
        icon: '🍜',
        count: 18,
        color: 'bg-orange-50 border-orange-200 text-orange-700'
    },
    {
        id: 'a1',
        title: 'A1',
        description: 'Các từ vựng cơ bản cấp độ A1.',
        icon: '📚',
        count: 20,
        color: 'bg-green-50 border-green-200 text-green-700'
    }
];