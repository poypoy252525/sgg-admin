import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Row } from "@tanstack/react-table";
import { Student } from "generated/prisma";
import { Ellipsis, Eye, Trash2, UserPen } from "lucide-react";
import { useState } from "react";
import UpsertStudentSheet from "./upsert-student-sheet";
import { Link } from "react-router-dom";
import { useStudentStore } from "@/stores/student";

interface Props {
  row: Row<Student>;
}

const Actions = ({ row }: Props) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const setStudents = useStudentStore((state) => state.setStudents);
  return (
    <>
      <UpsertStudentSheet
        student={row.original}
        open={sheetOpen}
        setOpen={setSheetOpen}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="ghost">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <Link to={`/students/${row.original.id}`}>
              <DropdownMenuItem>
                <span>View</span>
                <DropdownMenuShortcut>
                  <Eye />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={() => setSheetOpen(true)}>
              <span>Edit</span>
              <DropdownMenuShortcut>
                <UserPen />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              variant="destructive"
              onClick={async () => {
                await window.electron.deleteStudent(row.original.id);
                setStudents(await window.electron.getStudents());
              }}
            >
              <span>Delete</span>
              <DropdownMenuShortcut>
                <Trash2 />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Actions;
