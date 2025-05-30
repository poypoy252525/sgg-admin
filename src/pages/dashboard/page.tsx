import PageBody from "@/components/page-body";
import PageContainer from "@/components/page-container";
import PageDescription from "@/components/page-description";
import PageHeader from "@/components/page-header";
import PageTitle from "@/components/page-title";
import SummaryCard from "./components/summary-card";

const DashboardPage = () => {
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Dashboard</PageTitle>
        <PageDescription>Summary of all your records</PageDescription>
      </PageHeader>
      <PageBody>
        <div className="grid grid-cols-3 gap-4">
          <SummaryCard />
          <SummaryCard />
          <SummaryCard />
        </div>
      </PageBody>
    </PageContainer>
  );
};

export default DashboardPage;
