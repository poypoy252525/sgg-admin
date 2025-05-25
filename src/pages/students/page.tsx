import PageContainer from "@/components/page-container";
import PageDescription from "@/components/page-description";
import PageHeader from "@/components/page-header";
import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Student } from "generated/prisma";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    (async () => {
      const students = await window.electron.getStudents();
      setStudents(students);
    })();
  }, []);

  console.log(students);

  return (
    <PageContainer>
      <PageHeader
        actions={
          <Button
            onClick={async () => {
              await window.electron.createStudent({
                courseId: 1,
                firstName: "Carl Jefferson",
                middleName: "Eguia",
                lastName: "Delfin",
              });
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
    </PageContainer>
  );
};

export default StudentsPage;
