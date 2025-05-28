import { DataTable } from "@/components/data-table";
import PageBody from "@/components/page-body";
import PageContainer from "@/components/page-container";
import PageDescription from "@/components/page-description";
import PageHeader from "@/components/page-header";
import PageTitle from "@/components/page-title";
import { useCourseStore } from "@/stores/course";
import { useCallback, useEffect } from "react";
import { columns } from "./columns";
import { Input } from "@/components/ui/input";
import AddCourseSheet from "./components/add-course-sheet";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
      <PageHeader
        actions={
          <AddCourseSheet>
            <Button size="sm">
              <Plus />
              Add Course
            </Button>
          </AddCourseSheet>
        }
      >
        <PageTitle>Courses</PageTitle>
        <PageDescription>
          Lorem ipsum dolor sit amet consectetur.
        </PageDescription>
      </PageHeader>
      <PageBody>
        <DataTable
          columns={columns}
          data={courses}
          filterInputComponent={(props) => (
            <Input {...props("title")} placeholder="Filter title..." />
          )}
        />
      </PageBody>
    </PageContainer>
  );
};

export default CoursesPage;
