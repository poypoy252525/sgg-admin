import PageBody from "@/components/page-body";
import PageContainer from "@/components/page-container";
import PageDescription from "@/components/page-description";
import PageHeader from "@/components/page-header";
import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { useStudentStore } from "@/stores/student";
import { Plus } from "lucide-react";
import { useCallback, useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "../../components/data-table";

const StudentsPage = () => {
  const { list: students, setStudents } = useStudentStore();

  const fetchStudents = useCallback(async () => {
    const students = await window.electron.getStudents();
    console.log(students[0].course);
    setStudents(students);
  }, [setStudents]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return (
    <PageContainer>
      <PageHeader
        actions={
          <Button
            size="sm"
            onClick={async () => {
              await window.electron.createStudent({
                courseId: 1,
                firstName: "Carl Jefferson",
                middleName: "Eguia",
                lastName: "Delfin",
              });
              fetchStudents();
            }}
          >
            <Plus />
            Add Student
          </Button>
        }
      >
        <PageTitle>Students</PageTitle>
        <PageDescription>Lorem ipsum dolor sit amet.</PageDescription>
      </PageHeader>
      <PageBody>
        <DataTable columns={columns} data={students} columnFilter="fullName" />
      </PageBody>
    </PageContainer>
  );
};

export default StudentsPage;
