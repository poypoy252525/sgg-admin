import { ZodStudent } from "@/schemas/student";
import { Competency, Course, Student } from "./generated/prisma";

export {};

declare global {
  interface Window {
    electron: {
      getStudents: () => Promise<(Student & { course: Course })[]>;
      getStudent: (id: number) => Promise<Student & { course: Course }>;
      deleteStudent: (id: number) => Promise<{ success: boolean }>;
      createStudent: (student: ZodStudent) => Promise<void>;
      getCourses: () => Promise<
        (Course & { competencies: Competency[]; students: Student[] })[]
      >;
      getCourse: (id: number) => Promise<Course>;
    };
  }
}
