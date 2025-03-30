'use client';
import { useMemo, useState } from "react";
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


    const fetchMicrostories = async () => {
        const { data, error } = await supabase.from("micro_stories").select("*");
        if (error) {
            console.error("Error fetching microstories:", error);
            return;
        }
        setMicrostories(data);
        setLoading(false);
    };




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
                    <a href={`https://asisdninqgnkereutwxt.supabase.co/storage/v1/object/public/${row.original.file_image}`} target="_blank" rel="noopener noreferrer">
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
                    <a className="text-verde-goodkidz  hover:underline" href={`https://asisdninqgnkereutwxt.supabase.co/storage/v1/object/public/${row.original.file_pdf}`} target="_blank" rel="noopener noreferrer">
                        Ver PDF
                    </a>
                ),
            },
        ],
        []
    );


    if (loading) return <div className="text-center text-2xl">Cargando...</div>;
    if (microstories.length === 0) return <div>No hay historias micro</div>;

    return (
        <div className="p-4 m-12">
            <h1 className="text-6xl font-bold mb-4">Microcuentos</h1>
            <h1 className="text-xl font-bold mb-4">Inscritos en el Concurso</h1>
            <Table
                data={microstories}
                columns={columns}
                totalCount={microstories.length}
                isLoading={loading}
                searchField="title"
                fetchData={fetchMicrostories}
                emptyMessage="No se encontraron Microcuentos."
                pageSizeOptions={[5, 10, 20, 50]}
            />
        </div>
    );
}
