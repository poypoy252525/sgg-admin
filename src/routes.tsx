import { createHashRouter } from "react-router-dom";
import App from "./App";
import DashboardPage from "./pages/dashboard/page";
import StudentsPage from "./pages/students/page";
import CoursesPage from "./pages/courses/page";
import StudentDetailsPage from "./pages/students/[id]/page";
import CourseDetailsPage from "./pages/courses/[id]/page";

export const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <DashboardPage /> },
      {
        path: "students",
        element: <StudentsPage />,
      },
      {
        path: "students/:id",
        element: <StudentDetailsPage />,
      },
      { path: "courses", element: <CoursesPage /> },
      { path: "courses/:id", element: <CourseDetailsPage /> },
    ],
  },
]);
