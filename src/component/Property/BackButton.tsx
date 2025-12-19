import { useRouter } from 'next/navigation';

const BackButton = () => {
    const router = useRouter();

    return (
        <div className="bg-white shadow-sm">
            <div className="max-w-6xl mx-auto px-8 py-4">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-[#588157] hover:text-[#344E41] font-semibold transition-colors"
                >
                    <span>←</span>
                    Back to Search Results
                </button>
            </div>
        </div>
    );
};

export default BackButton;
