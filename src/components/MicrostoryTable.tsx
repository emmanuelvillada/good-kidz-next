'use client';
import { useMemo, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { Table } from "./ui/Table";

interface Microstory {
    id: number;
    created_at: string;
    title: string;
    file_image: string;
    file_pdf: string;
    name: string;
    email: string;
    age: number;
    phone: string;
    address: string;
    city: string;
    attendant_name: string;
}

export default function MicrostoryTable() {
    const [microstories, setMicrostories] = useState<Microstory[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);

    const fetchMicrostories = async (pageIndex = 0, pageSize = 10) => {
        setLoading(true);
        const from = pageIndex * pageSize;
        const to = from + pageSize - 1;

        const { data, error, count } = await supabase
            .from("micro_stories")
            .select("*", { count: "exact" }) // importante
            .order("created_at", { ascending: false })
            .range(from, to);

        if (error) {
            console.error("Error fetching microstories:", error);
            setLoading(false);
            return;
        }

        setMicrostories(data || []);
        setTotalCount(count || 0);
        setLoading(false);
    };

    // Primera carga (solo se hace una vez)
    useEffect(() => {
        fetchMicrostories(0, 10);
    }, []);

    const columns = useMemo(
        () => [
            { header: "Nombre", accessorKey: "name" },
            { header: "Email", accessorKey: "email" },
            { header: "Edad", accessorKey: "age" },
            { header: "Telefono", accessorKey: "phone" },
            { header: "Ciudad", accessorKey: "city" },
            { header: "Dirección", accessorKey: "address" },
            { header: "Nombre del asistente", accessorKey: "attendant_name" },
            { header: "Título de la historia", accessorKey: "title" },
            {
                header: "Imagen de la historia",
                accessorKey: "file_image",
                cell: ({ row }: { row: { original: Microstory } }) => (
                    <a
                        href={`https://asisdninqgnkereutwxt.supabase.co/storage/v1/object/public/${row.original.file_image}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            src={`https://asisdninqgnkereutwxt.supabase.co/storage/v1/object/public/${row.original.file_image}`}
                            alt="Imagen de la historia"
                            width={100}
                            height={100}
                            className="rounded-lg"
                        />
                        <span className="text-verde-goodkidz hover:underline">Ver imagen</span>
                    </a>
                ),
            },
            {
                header: "PDF de la historia",
                accessorKey: "file_pdf",
                cell: ({ row }: { row: { original: Microstory } }) => (
                    <a
                        className="text-verde-goodkidz hover:underline"
                        href={`https://asisdninqgnkereutwxt.supabase.co/storage/v1/object/public/${row.original.file_pdf}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Ver PDF
                    </a>
                ),
            },
        ],
        []
    );

    return (
        <div className="p-4 m-12">
            <h1 className="text-6xl font-bold mb-4 text-center">Microcuentos</h1>
            <h1 className="text-xl font-bold mb-4">Inscritos en el Concurso</h1>
            <Table
                data={microstories}
                columns={columns}
                totalCount={totalCount}
                isLoading={loading}
                searchField="title"
                fetchData={fetchMicrostories}
                emptyMessage="No se encontraron Microcuentos."
            />
        </div>
    );
}
