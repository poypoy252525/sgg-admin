import { ZodStudent } from "@/schemas/student";
import { Competency, Course, Student, Subject } from "./generated/prisma";
import { ZodCourse } from "@/schemas/course";
import { ZodCompetency } from "@/schemas/competency";
import { ZodSubject } from "@/schemas/subject";

export {};

declare global {
  interface Window {
    electron: {
      getStudents: () => Promise<(Student & { course: Course })[]>;
      getStudent: (id: number) => Promise<Student & { course: Course }>;
      deleteStudent: (id: number) => Promise<{ success: boolean }>;
      createStudent: (student: ZodStudent) => Promise<void>;
      getCourses: () => Promise<
        (Course & {
          competencies: Competency[];
          students: Student[];
          subjects: Subject[];
        })[]
      >;
      getCourse: (id: number) => Promise<
        Course & {
          competencies: Competency[];
          students: Student[];
          subjects: Subject[];
        }
      >;
      createCourse: (course: ZodCourse) => Promise<void>;
      createCompetency: (competency: ZodCompetency) => Promise<void>;
      getCompetencies: () => Promise<Competency[]>;
      createSubject: (subject: ZodSubject) => Promise<void>;
      getSubjects: () => Promise<Subject[]>;
    };
  }
}
