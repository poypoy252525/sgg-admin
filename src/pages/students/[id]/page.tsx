import PageBody from "@/components/page-body";
import PageContainer from "@/components/page-container";
import PageDescription from "@/components/page-description";
import PageHeader from "@/components/page-header";
import PageTitle from "@/components/page-title";
import { Student } from "generated/prisma";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StudentDetailsPage = () => {
  const [student, setStudent] = useState<Student>();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (id) {
        const stu = await window.electron.getStudent(parseInt(id));
        setStudent(stu);
      }
    })();
  }, [id]);
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>{`${student?.firstName} ${student?.lastName}`}</PageTitle>
        <PageDescription>Lorem ipsum dolor sit.</PageDescription>
      </PageHeader>
      <PageBody>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
        voluptatum.
      </PageBody>
    </PageContainer>
  );
};

export default StudentDetailsPage;
