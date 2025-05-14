'use client';

import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender, ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

interface DataTableProps<TData> {
    data: TData[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    columns: ColumnDef<TData, any>[];
    totalCount: number;
    isLoading?: boolean;
    searchField?: keyof TData;
    fetchData: (pageIndex: number, pageSize: number) => Promise<void>;
    emptyMessage?: string;
    pageSizeOptions?: number[];
}

export function Table<TData>({
    data,
    columns,
    totalCount,
    isLoading = false,
    searchField,
    fetchData,
    emptyMessage = "No data found.",
    pageSizeOptions = [5, 10, 20, 50],
}: DataTableProps<TData>) {
    const [search, setSearch] = useState("");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [filteredData, setFilteredData] = useState<TData[]>(data);

    // Update total pages when count or page size changes
    useEffect(() => {
        setTotalPages(Math.ceil(totalCount / pageSize));
    }, [totalCount, pageSize]);

    // Apply search filter
    useEffect(() => {
        if (searchField && search) {
            const filtered = data.filter((row: TData) => {
                const fieldValue = String(row[searchField]).toLowerCase();
                return fieldValue.includes(search.toLowerCase());
            });
            setFilteredData(filtered);
        } else {
            setFilteredData(data);
        }
    }, [data, search, searchField]);

    // Initialize table
    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    // Handle page navigation
    const handlePageChange = (newPageIndex: number) => {
        setPageIndex(newPageIndex);
        setCurrentPage(newPageIndex);
        fetchData(newPageIndex, pageSize);
    };

    // Handle page size change
    const handlePageSizeChange = (newPageSize: number) => {
        setPageSize(newPageSize);
        setPageIndex(0);
        setCurrentPage(0);
        fetchData(0, newPageSize);
    };

    // Handle search
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setPageIndex(0);
        setCurrentPage(0);
    };

    // Show loading state
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-48">
                <svg className="animate-spin h-6 w-6 text-verde-goodkidz" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                <span className="ml-2">Cargando microcuentos...</span>
            </div>
        );
    }


    // Show empty state
    if (data.length === 0) {
        return <div>{emptyMessage}</div>;
    }

    return (
        <div className="md:max-w-screen-xl mx-auto sm:max-w-screen-sm">
            {searchField && (
                <div className="flex items-center mb-4">
                    <Input
                        type="text"
                        placeholder={`Buscar por ${String(searchField)}`}
                        value={search}
                        onChange={handleSearchChange}
                        className="mr-2"
                    />
                </div>
            )}

            <div className="mb-4 flex justify-between items-center m-8">
                <div>
                    <Button className="mr-2" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
                        Anterior
                    </Button>
                    <span className="mx-2">
                        Página {currentPage + 1} de {totalPages}
                    </span>
                    <Button className="ml-2" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
                        Siguiente
                    </Button>
                </div>

                <div className=" ">
                    <label htmlFor="pageSizeSelect" className="sr-only">
                        Select page size
                    </label>
                    <select
                        id="pageSizeSelect"
                        value={pageSize}
                        onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                        className="p-2 border rounded"
                        aria-label="Select page size"
                    >
                        {pageSizeOptions.map((option) => (
                            <option key={option} value={option}>
                                {option} por página
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="rounded-md border">
                <table className="min-w-full border-collapse">
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
                            <tr key={row.id} className="border-b">
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="border p-2">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}