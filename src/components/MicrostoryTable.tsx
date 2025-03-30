'use client';
import { useMemo, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

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
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchMicrostories = async () => {
            const { data, error } = await supabase.from("micro_stories").select("*");
            if (error) {
                console.error("Error fetching microstories:", error);
                return;
            }
            setMicrostories(data);
            setLoading(false);
        };

        fetchMicrostories();
    }, []);

    // Filtrar datos solo cuando cambie la búsqueda
    const filteredData = useMemo(
        () => microstories.filter((row) => row.name.toLowerCase().includes(search.toLowerCase())),
        [microstories, search]
    );

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

    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    if (loading) return <div className="text-center text-2xl">Cargando...</div>;
    if (microstories.length === 0) return <div>No hay historias micro</div>;

    return (
        <div className="p-4 m-12">
            <h1 className="text-6xl font-bold mb-4">Microcuentos</h1>
            <h1 className="text-xl font-bold mb-4">Inscritos en el Concurso</h1>
            <Input
                placeholder="Buscar por nombre..."
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-4"
            />
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className="bg-gray-100">
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="border p-2">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="border">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="border p-2">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4 flex justify-between">
                <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    Anterior
                </Button>
                <span>Página {table.getState().pagination.pageIndex + 1}</span>
                <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    Siguiente
                </Button>
            </div>
        </div>
    );
}
