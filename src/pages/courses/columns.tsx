import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Course } from "generated/prisma";
import { Ellipsis } from "lucide-react";

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
    cell: () => {
      return (
        <Button variant="ghost" size="sm">
          <Ellipsis />
        </Button>
      );
    },
  },
];
