import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Competency, Course, Student, Subject } from "generated/prisma";
import AddSubjectDialog from "./add-subject-dialog";

interface Props {
  course: Course & {
    competencies: Competency[];
    students: Student[];
    subjects: Subject[];
  };
}

const DepedCourseAsideCard = ({ course }: Props) => {
  const { subjects, id } = course;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Details</CardTitle>
        <CardDescription>Subjects</CardDescription>
      </CardHeader>
      <CardContent>
        {subjects.length !== 0 ? (
          subjects.map((subject) => <div key={subject.id}>{subject.name}</div>)
        ) : (
          <div className="w-full flex justify-center">No subjects.</div>
        )}
      </CardContent>
      <CardFooter>
        <AddSubjectDialog courseId={id} />
      </CardFooter>
    </Card>
  );
};

export default DepedCourseAsideCard;
