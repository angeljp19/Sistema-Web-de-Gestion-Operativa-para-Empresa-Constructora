import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";

import { useState, useEffect } from "react";
import { usePagination } from "../hooks/usePagination";
import { Pagination } from "./Pagination";

interface User {
  id: number;
  nombre: string;
  apellido: string;
  cedula: number;
  planta: string;
}

interface tableProps {
  rowSelected: (user: User) => void;
  users: User[];
}

export function GestionEmpleadosTable(tableProps: tableProps) {
  const [search, setSearch] = useState("");
  const { rowSelected, users } = tableProps;
  const [bgRowSelected, setBgRowSelected] = useState(-1);
  const filteredUsers = users.filter((user) =>
    `${user.nombre} ${user.apellido} ${user.cedula} ${user.planta} `
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  // paginate the filtered results
  const { currentData, currentPage, maxPage, jump } = usePagination(
    filteredUsers,
    10,
  );

  return (
    <div className="flex flex-col space-y-5">
      <div className="sticky top-0  z-10 md:w-1/3">
        <TextInput
          type="text"
          placeholder="Buscar usuario..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="overflow-auto max-h-[50vh]">
        <Table hoverable>
          <TableHead className="sticky top-0 bg-white z-10">
            <TableRow>
              <TableHeadCell>Nombre</TableHeadCell>
              <TableHeadCell>Apellido</TableHeadCell>
              <TableHeadCell>Cedula</TableHeadCell>
              <TableHeadCell>Planta</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {currentData.map((user, index) => (
              <TableRow
                onClick={() => {
                  rowSelected(user);
                  setBgRowSelected(index);
                }}
                className={
                  index == bgRowSelected
                    ? `bg-blue-700 hover:bg-blue-700 text-white`
                    : `bg-white `
                }
              >
                <TableCell className="whitespace-nowrap">
                  {user.nombre}
                </TableCell>
                <TableCell>{user.apellido}</TableCell>
                <TableCell>{user.cedula}</TableCell>
                <TableCell>{user.planta}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={maxPage}
        onPageChange={jump}
      />
    </div>
  );
}
