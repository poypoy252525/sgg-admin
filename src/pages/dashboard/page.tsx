import PageBody from "@/components/page-body";
import PageContainer from "@/components/page-container";
import PageDescription from "@/components/page-description";
import PageHeader from "@/components/page-header";
import PageTitle from "@/components/page-title";

const DashboardPage = () => {
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Dashboard</PageTitle>
        <PageDescription>Summary of all your records</PageDescription>
      </PageHeader>
      <PageBody>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
        distinctio!
      </PageBody>
    </PageContainer>
  );
};

export default DashboardPage;
