import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Course } from "generated/prisma";
import { memo, ReactNode, useState } from "react";
import CourseForm from "./course-form";

interface Props {
  children?: ReactNode;
  course?: Course;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

const AddCourseSheet = memo(({ children, course, open, setOpen }: Props) => {
  const [localOpen, setLocalOpen] = useState(false);
  return (
    <Sheet open={open ?? localOpen} onOpenChange={setOpen ?? setLocalOpen}>
      {children && <SheetTrigger asChild>{children}</SheetTrigger>}
      <SheetContent className="flex flex-col gap-0">
        <SheetHeader className="h-14 border-b justify-center">
          <SheetTitle>Course Details</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto styled-scrollbar">
          <CourseForm course={course} />
        </div>
        <SheetFooter className="h-14 border-t flex flex-row items-center">
          <div className="ml-auto flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => (setOpen ? setOpen(false) : setLocalOpen(false))}
            >
              Cancel
            </Button>
            <Button type="submit" form="add-student-form" size="sm">
              Save
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
});

export default AddCourseSheet;
