import food from "@/lib/db/food.json";
import hobby from "@/lib/db/hobbies.json";
import { QuizItem, QuizOption } from "@/lib/types/quiz";
import { VocabType } from "@/lib/types/vocab";

export const getMockVocabularies = (topic: string): VocabType[] => {
    let vocabData: VocabType[] = [];
    switch (topic) {
        case "hobbies":
            vocabData = hobby as VocabType[];
            break;
        case "food":
            vocabData = food as VocabType[];
            break;


    };
    return vocabData;
}
export const getSizeofTopic = (topic: string): number => {
    switch (topic) {
        case "hobbies": return (hobby as VocabType[]).length;
        case "food": return (food as VocabType[]).length;
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