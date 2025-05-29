import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { Course } from "generated/prisma";
import Actions from "./components/actions";

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: "Course name",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ getValue }) => {
      const courseType = getValue() as string;
      return (
        <Badge className="capitalize" variant="secondary">
          {courseType.toLowerCase()}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      return <Actions course={row.original} />;
    },
  },
];
