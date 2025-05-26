import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useStudentStore } from "@/stores/student";
import { Student } from "generated/prisma";
import { Loader2 } from "lucide-react";
import { ReactNode, useState } from "react";

interface Props {
  children?: ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  student: Student;
}

const DeleteStudentDialog = ({ children, open, setOpen, student }: Props) => {
  const [localOpen, setLocalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [matched, setMatched] = useState(false);

  const setStudents = useStudentStore((state) => state.setStudents);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await window.electron.deleteStudent(student.id);
      if (setOpen) {
        setOpen(false);
      } else {
        setLocalOpen(false);
      }
      setStudents(await window.electron.getStudents());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open ?? localOpen} onOpenChange={setOpen ?? setLocalOpen}>
      {children && <DialogTrigger>{children}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Student</DialogTitle>
          <DialogDescription>
            {`Are you sure you want to delete `}
            <span className="font-bold">{`${student.firstName} ${student.lastName}`}</span>
            {`? This action can not be undone. `}
            Type{" "}
            <span className="font-bold">{`"${student.firstName} ${student.lastName}"`}</span>{" "}
            in the box below.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Input
            placeholder={`Type "${student.firstName} ${student.lastName}"`}
            onChange={(e) => {
              setMatched(
                e.target.value === `${student.firstName} ${student.lastName}`
              );
            }}
          />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => (setOpen ? setOpen(false) : setLocalOpen(false))}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading || !matched}
          >
            {loading && <Loader2 className="animate-spin" />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteStudentDialog;
