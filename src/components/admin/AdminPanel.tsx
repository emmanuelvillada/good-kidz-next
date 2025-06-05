import PastEvents from "./PastEvents"
import FutureEvents from "./FutureEvents"
export default function AdminPanel() {

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
            <PastEvents />
            <FutureEvents />
        </div>
    )
}
