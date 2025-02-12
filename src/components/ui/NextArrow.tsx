import { ChevronRight } from 'lucide-react';

const NextArrow = (props: { onClick: () => void }) => {
    const { onClick } = props;
    return (
        <button
            onClick={onClick}
            className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 z-10 bg-verde-goodkidz text-white p-2 rounded-full hover:scale-110 transition-transform"
            aria-label="Siguiente"
        >
            <ChevronRight className="w-6 h-6" />
        </button>
    );
};

export default NextArrow;