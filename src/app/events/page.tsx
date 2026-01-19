import UpcomingEvents from "@/components/home/UpcomingEvents";
import Events from "@/components/home/Events";

export default function EventsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-[#F9FFFB] my-24">
            <UpcomingEvents />
            <Events />
        </div>
    );
};
