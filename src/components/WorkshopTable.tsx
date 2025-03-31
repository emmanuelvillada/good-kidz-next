'use client';

import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "./ui/Table";

interface Workshop {
    id: number;
    created_at: string;
    name: string;
    age: number;
    document: number;
    responsable_name: string;
    responsable_document: number;
    cellphone: number;
    email: string;
    disability_details: string;
}

export default function WorkshopTable() {
    const [workshops, setWorkshops] = useState<Workshop[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);

    const fetchWorkshops = async (pageIndex: number, pageSize: number) => {
        setLoading(true);
        const { data, error, count } = await supabase
            .from("workshop")
            .select("*", { count: "exact" })
            .order("created_at", { ascending: false })
            .range(pageIndex * pageSize, (pageIndex + 1) * pageSize);

        if (error) {
            console.error("Error fetching workshops:", error);
            return;
        }

        setWorkshops(data);
        setTotalCount(count || 0);
        setLoading(false);
    };

    useEffect(() => {
        fetchWorkshops(0, 10);
    }, []);

    // Configuración de las columnas
    const columnHelper = createColumnHelper<Workshop>();
    const columns = [
        columnHelper.accessor("name", { header: "Nombre" }),
        columnHelper.accessor("age", { header: "Edad" }),
        columnHelper.accessor("document", { header: "Documento" }),
        columnHelper.accessor("responsable_name", { header: "Nombre del responsable" }),
        columnHelper.accessor("responsable_document", { header: "Documento del responsable" }),
        columnHelper.accessor("cellphone", { header: "Celular" }),
        columnHelper.accessor("email", { header: "Email" }),
        columnHelper.accessor("disability_details", { header: "Detalles de discapacidad" }),
    ];

    return (
        <div className="flex flex-col items-center justify-center  py-2 bg-gray-100 m-6">

            <h1 className="text-4xl font-bold mb-4">Talleres</h1>
            <Table
                data={workshops}
                columns={columns}
                totalCount={totalCount}
                isLoading={loading}
                searchField="name"
                fetchData={fetchWorkshops}
                emptyMessage="No se encontraron talleres."
                pageSizeOptions={[5, 10, 20, 50]}
            />
        </div>
    );
}