import PageBody from "@/components/page-body";
import PageContainer from "@/components/page-container";
import PageDescription from "@/components/page-description";
import PageHeader from "@/components/page-header";
import PageTitle from "@/components/page-title";
import { useCourseStore } from "@/stores/course";
import { useStudentStore } from "@/stores/student";
import { useCompetencyStore } from "@/stores/competency";
import { useCallback, useEffect } from "react";
import { BookOpen, Users, Target } from "lucide-react";
import SummaryCard from "./components/summary-card";

const DashboardPage = () => {
  const { courses, setCourses } = useCourseStore();
  const { setStudents } = useStudentStore();
  const { refresh: refreshCompetencies } = useCompetencyStore();

  const fetchDashboardData = useCallback(async () => {
    try {
      // Fetch courses with their competencies and students
      const coursesData = await window.electron.getCourses();
      setCourses(coursesData);

      // Fetch students with course information
      const studentsData = await window.electron.getStudents();
      setStudents(studentsData);

      // Fetch competencies
      await refreshCompetencies();
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    }
  }, [setCourses, setStudents, refreshCompetencies]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Calculate total students across all courses
  const totalStudents = courses.reduce(
    (total, course) => total + course.students.length,
    0
  );

  // Calculate total competencies across all courses
  const totalCompetencies = courses.reduce(
    (total, course) => total + course.competencies.length,
    0
  );

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Dashboard</PageTitle>
        <PageDescription>Summary of all your records</PageDescription>
      </PageHeader>
      <PageBody>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SummaryCard
            title="Total Courses"
            value={courses.length}
            description="Active courses in the system"
            icon={BookOpen}
          />
          <SummaryCard
            title="Total Students"
            value={totalStudents}
            description="Students enrolled across all courses"
            icon={Users}
          />
          <SummaryCard
            title="Total Competencies"
            value={totalCompetencies}
            description="Competencies available across all courses"
            icon={Target}
          />
        </div>
      </PageBody>
    </PageContainer>
  );
};

export default DashboardPage;
