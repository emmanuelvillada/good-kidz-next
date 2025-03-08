import { ChevronLeft } from "lucide-react"

export default function PrevArrow(props: { onClick: () => void }) {
    const { onClick } = props;
    return (
        <button
            onClick={onClick}
            className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 z-10 bg-verde-goodkidz text-white p-2 rounded-full hover:scale-110 transition-transform"
            aria-label="Anterior"
        >
            <ChevronLeft className="w-6 h-6" />
        </button>
    );
};