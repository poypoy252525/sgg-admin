import { DataTable } from "@/components/data-table";
import PageBody from "@/components/page-body";
import PageContainer from "@/components/page-container";
import PageDescription from "@/components/page-description";
import PageHeader from "@/components/page-header";
import PageTitle from "@/components/page-title";
import { useCourseStore } from "@/stores/course";
import { useCallback, useEffect } from "react";
import { columns } from "./columns";

const CoursesPage = () => {
  const { courses, setCourses } = useCourseStore();

  const fetchCourses = useCallback(async () => {
    const list = await window.electron.getCourses();
    setCourses(list);
  }, [setCourses]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Courses</PageTitle>
        <PageDescription>
          Lorem ipsum dolor sit amet consectetur.
        </PageDescription>
      </PageHeader>
      <PageBody>
        <DataTable columns={columns} data={courses} columnFilter="title" />
      </PageBody>
    </PageContainer>
  );
};

export default CoursesPage;
