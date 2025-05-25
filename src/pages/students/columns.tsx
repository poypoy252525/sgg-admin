import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Course, Student } from "generated/prisma";
import { Ellipsis } from "lucide-react";

export const columns: ColumnDef<Student & { course: Course }>[] = [
  {
    id: "fullName",
    accessorFn: ({ firstName, middleName, lastName }) =>
      `${firstName} ${middleName?.charAt(0).toUpperCase()}. ${lastName}`,
    header: "Full name",
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
    id: "actions",
    header: "",
    cell: () => {
      return (
        <Button size="sm" variant="ghost">
          <Ellipsis />
        </Button>
      );
    },
  },
];
