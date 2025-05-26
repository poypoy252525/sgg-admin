import PageBody from "@/components/page-body";
import PageContainer from "@/components/page-container";
import PageDescription from "@/components/page-description";
import PageHeader from "@/components/page-header";
import PageTitle from "@/components/page-title";
import { useStudentStore } from "@/stores/student";
import { useCallback, useEffect } from "react";
import { DataTable } from "../../components/data-table";
import { columns } from "./columns";
import UpsertStudentSheet from "./components/upsert-student-sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const StudentsPage = () => {
  const { list: students, setStudents } = useStudentStore();

  const fetchStudents = useCallback(async () => {
    const students = await window.electron.getStudents();
    setStudents(students);
  }, [setStudents]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return (
    <PageContainer>
      <PageHeader
        actions={
          <UpsertStudentSheet>
            <Button size="sm">
              <Plus />
              Add Student
            </Button>
          </UpsertStudentSheet>
        }
      >
        <PageTitle>Students</PageTitle>
        <PageDescription>Lorem ipsum dolor sit amet.</PageDescription>
      </PageHeader>
      <PageBody>
        <DataTable
          columns={columns}
          data={students}
          filterInputComponent={(props) => (
            <Input {...props("fullName")} placeholder="Filter name..." />
          )}
        />
      </PageBody>
    </PageContainer>
  );
};

export default StudentsPage;
