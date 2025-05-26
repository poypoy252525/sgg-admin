import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { Course, Student } from "generated/prisma";
import Actions from "./components/actions";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Student & { course: Course }>[] = [
  {
    id: "fullName",
    accessorFn: ({ firstName, middleName, lastName }) =>
      `${firstName} ${middleName?.charAt(0).toUpperCase()}. ${lastName}`,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full name" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "course",
    header: "Course",
    cell: ({ getValue }) => {
      const course = getValue() as Course;

      return course.title;
    },
  },
  {
    accessorKey: "sex",
    header: "Gender",
    cell: ({ getValue }) => {
      const sex = getValue() as string;

      return (
        <Badge className="capitalize" variant="outline">
          {sex.toLowerCase()}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      return <Actions row={row} />;
    },
  },
];
