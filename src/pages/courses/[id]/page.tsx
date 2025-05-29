import { DataTable } from "@/components/data-table";
import PageBody from "@/components/page-body";
import PageContainer from "@/components/page-container";
import PageDescription from "@/components/page-description";
import PageHeader from "@/components/page-header";
import PageTitle from "@/components/page-title";
import { Competency, Course, Student } from "generated/prisma";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { columns } from "./columns";
import { Input } from "@/components/ui/input";
import CourseAsideCard from "./components/course-aside-card";

const CourseDetailsPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<
    Course & { competencies: Competency[]; students: Student[] }
  >();

  const fetchCourse = useCallback(async () => {
    if (!id) return;
    const c = await window.electron.getCourse(parseInt(id));
    setCourse(c);
  }, [id]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>{course?.title}</PageTitle>
        <PageDescription>{course?.type}</PageDescription>
      </PageHeader>
      <PageBody>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-7">
            <div>
              <DataTable
                columns={columns}
                data={course?.students || []}
                filterInputComponent={(props) => (
                  <Input {...props("fullName")} placeholder="Filter name..." />
                )}
              />
            </div>
          </div>
          <div className="col-span-5 flex flex-col w-full h-full overflow-auto">
            {course && <CourseAsideCard course={course} />}
          </div>
        </div>
      </PageBody>
    </PageContainer>
  );
};

export default CourseDetailsPage;
