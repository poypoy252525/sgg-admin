import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import StudentForm from "./student-form";

const AddStudentSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm">
          <Plus />
          Add Student
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-0">
        <SheetHeader className="h-14 border-b justify-center">
          <SheetTitle>Student Information</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto">
          <StudentForm />
        </div>
        <SheetFooter className="h-14 border-t flex flex-row items-center">
          <Button
            type="submit"
            form="add-student-form"
            size="sm"
            className="ml-auto"
          >
            Save
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AddStudentSheet;
