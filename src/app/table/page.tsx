import MicrostoryTable from "@/components/MicrostoryTable";
import ProtectedPage from "@/components/ProtectedPage";
export default function TablePage() {
    return (
        <>
            <ProtectedPage>
                <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100 m-12">
                    <h1 className="text-6xl font-bold mb-4">Microcuentos</h1>
                    <MicrostoryTable>
                    </MicrostoryTable>
                </div>
            </ProtectedPage>
        </>
    );
}