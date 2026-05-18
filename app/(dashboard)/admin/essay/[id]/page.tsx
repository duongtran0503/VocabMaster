import ContainerEssayVocab from "@/app/(dashboard)/admin/essay/container-essay-vocab";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function EssayVocabPage({ params }: Props) {
    const { id } = await params;
    console.log("EssayVocabPage - Loaded topic:", id); // Kiểm tra tham số topic
    return <ContainerEssayVocab topic={id} />;
}