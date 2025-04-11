"use client";
import { useState } from "react";
import MicrostoryTable from "@/components/MicrostoryTable";
import ProtectedPage from "@/components/ProtectedPage";

export default function TablePage() {
    const [selectedTable, setSelectedTable] = useState(""); // Estado para la selección

    return (
        <ProtectedPage>
            <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100 m-12">
                <h1 className="text-6xl font-bold mb-4">Tablas</h1>

                {/* Selector de tabla */}
                <label htmlFor="table" className="mb-2">Escoja la tabla que desea visualizar</label>
                <select
                    id="table"
                    value={selectedTable}
                    onChange={(e) => setSelectedTable(e.target.value)}
                    className="mb-4 p-2 border rounded"
                >
                    <option value="">Seleccione una tabla</option>
                    <option value="microstories">Microcuentos</option>

                </select>

                {/* Renderizar la tabla según la selección */}

                {selectedTable === "microstories" && <MicrostoryTable />}

            </div>
        </ProtectedPage>
    );
}
