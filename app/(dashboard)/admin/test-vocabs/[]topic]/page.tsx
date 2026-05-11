import ContainerTestVocab from "@/app/(dashboard)/admin/_components/container-test-vocab";

interface Props {
    params: Promise<{ topic: string }>;
}
export default async function TestVocab({ params }: Props) {
    const { topic } = await params;
    return <div>
        <ContainerTestVocab topic={topic} />
    </div>
}
