import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Course, Student } from "generated/prisma";
import React, { useCallback, useEffect, useState } from "react";
import { ReactNode } from "react";

interface Props {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  children?: ReactNode;
  student: Student;
}

const StudentDetailsDialog = ({ open, setOpen, children, student }: Props) => {
  const [course, setCourse] = useState<Course>();

  const details = [
    { label: "Email", value: student.email },
    { label: "Age", value: student.age },
    { label: "Gender", value: student.sex },
    { label: "Address", value: student.address },
    { label: "Course", value: course?.title },
  ];

  const fetchCourse = useCallback(async () => {
    try {
      const course = await window.electron.getCourse(student.courseId);
      setCourse(course);
    } catch (error) {
      console.error(error);
    }
  }, [student.courseId]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`${student.firstName} ${student.lastName}`}</DialogTitle>
          <DialogDescription>{student.email}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-12 w-full rounded-md border p-5 text-sm gap-y-2">
          {details.map((item, index) => (
            <React.Fragment key={index}>
              <div className="col-span-4 font-medium">{item.label}</div>
              <div className="col-span-8 text-muted-foreground">
                {item.value}
              </div>
            </React.Fragment>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentDetailsDialog;
