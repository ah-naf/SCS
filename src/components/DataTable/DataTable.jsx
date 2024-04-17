"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { inter, open_sans } from "@/lib/fonts";
import Image from "next/image";
import { useState } from "react";
import { Input } from "../ui/input";
import { DataTablePagination } from "./DataTablePagination";

const data = [
  {
    id: 1,
    name: "Environmental Science test",
    campus: "Idaho falls1",
    college: "College of natural resources",
    operator: "Ahnaf Hasan",
    status: "Active",
    logo: "https://github.com/shadcn.png",
  },
  {
    id: 2,
    name: "Environmental Science test",
    campus: "Idaho falls2",
    college: "College of natural resources",
    operator: "Ahnaf Hasan",
    status: "active",
    logo: "",
  },
  {
    id: 3,
    name: "Environmental Science test",
    campus: "Idaho falls3",
    college: "College of natural resources",
    operator: "Ahnaf Hasan",
    status: "not active",
    logo: "https://github.com/shadcn.png",
  },
  {
    id: 4,
    name: "Environmental Science test",
    campus: "Idaho falls4",
    college: "College of natural resources",
    operator: "Ahnaf Hasan",
    status: "active",
    logo: "",
  },
];

const columns = [
  {
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) => {
      const logo = row.getValue("logo");
      return (
        <Image
          src={logo || "https://github.com/cpp.png"}
          alt="logo"
          width={40}
          height={40}
          className="rounded-full object-contain"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  { accessorKey: "campus", header: "Campus" },
  { accessorKey: "college", header: "College" },
  { accessorKey: "operator", header: "Operator" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <span
          className={`p-1 px-2 text-xs capitalize ${
            row.getValue("status").toLowerCase() === "active"
              ? "bg-green-200/90 text-green-800"
              : "bg-red-200/90 text-red-800"
          } rounded-xl ${inter.className} font-semibold`}
        >
          {row.getValue("status")}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function DataTable() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination,
      columnFilters,
    },
  });

  return (
    <div className="bg-white p-6 mt-8 rounded-md shadow-md">
      <div className="flex items-center mb-4">
        <Input
          placeholder="Filter name..."
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className={`font-bold ${open_sans.className}`}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={`capitalize ${inter.className} font-medium text-gray-900`}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}

export default DataTable;