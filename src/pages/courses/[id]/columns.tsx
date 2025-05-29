import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { Student } from "generated/prisma";

export const columns: ColumnDef<Student>[] = [
  {
    id: "fullName",
    accessorFn: ({ firstName, lastName }) => `${firstName} ${lastName}`,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Student name" />
    ),
  },
];
