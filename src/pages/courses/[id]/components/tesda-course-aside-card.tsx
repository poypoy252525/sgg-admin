import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Competency, Course, Student } from "generated/prisma";
import React from "react";
import AddCompetencyDialog from "./add-competency-dialog";

interface Props {
  course: Course & { competencies: Competency[]; students: Student[] };
}

const TesdaCourseAsideCard = ({ course }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Details</CardTitle>
        <CardDescription>Competencies of this course</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-1">
          {["BASIC", "COMMON", "CORE"].map((item, index) => (
            <React.Fragment key={index}>
              <div className="font-semibold text-sm capitalize">{`${item.toLowerCase()} Competencies`}</div>
              <div className="ps-2">
                {course.competencies.filter((com) => com.type === item)
                  .length ? (
                  course.competencies
                    .filter((com) => com.type === item)
                    .map((competency) => (
                      <div
                        key={competency.id}
                        className="text-muted-foreground text-sm"
                      >
                        {competency.name}
                      </div>
                    ))
                ) : (
                  <div className="text-sm text-muted-foreground p-2">
                    No results.
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <AddCompetencyDialog courseId={course.id} />
      </CardFooter>
    </Card>
  );
};

export default TesdaCourseAsideCard;
