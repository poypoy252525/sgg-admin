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
import DeleteStudentDialog from "./delete-student-dialog";
import StudentDetailsDialog from "./student-details-dialog";
import UpsertStudentSheet from "./upsert-student-sheet";

interface Props {
  row: Row<Student>;
}

const Actions = ({ row }: Props) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [studentDialogOpen, setStudentDialogOpen] = useState(false);

  return (
    <>
      <UpsertStudentSheet
        student={row.original}
        open={sheetOpen}
        setOpen={setSheetOpen}
      />
      <DeleteStudentDialog
        student={row.original}
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
      />
      <StudentDetailsDialog
        open={studentDialogOpen}
        setOpen={setStudentDialogOpen}
        student={row.original}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="ghost">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setStudentDialogOpen(true)}>
              <span>View</span>
              <DropdownMenuShortcut>
                <Eye />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
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
              // onClick={async () => {
              //   await window.electron.deleteStudent(row.original.id);
              //   setStudents(await window.electron.getStudents());
              // }}

              onClick={() => {
                setDeleteDialogOpen(true);
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
