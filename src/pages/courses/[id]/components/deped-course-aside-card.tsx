import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSubjectStore } from "@/stores/subject";
import { Competency, Course, Student, Subject } from "generated/prisma";
import { useEffect } from "react";
import AddSubjectDialog from "./add-subject-dialog";
import SubjectTable from "./subject-table";

interface Props {
  course: Course & {
    competencies: Competency[];
    students: Student[];
    subjects: Subject[];
  };
}

const DepedCourseAsideCard = ({ course }: Props) => {
  const { id } = course;

  const refreshSubjects = useSubjectStore((state) => state.refresh);
  const subjects = useSubjectStore((state) => state.subjects);

  useEffect(() => {
    refreshSubjects();
  }, [refreshSubjects]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Details</CardTitle>
        <CardDescription>Subjects</CardDescription>
      </CardHeader>
      <CardContent>
        <SubjectTable subjects={subjects} />
      </CardContent>
      <CardFooter>
        <AddSubjectDialog courseId={id} />
      </CardFooter>
    </Card>
  );
};

export default DepedCourseAsideCard;
