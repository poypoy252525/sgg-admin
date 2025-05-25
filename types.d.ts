import { ZodStudent } from "@/schemas/student";
import { Student } from "./generated/prisma";

export {};

declare global {
  interface Window {
    electron: {
      getStudents: () => Promise<Student[]>;
      createStudent: (student: ZodStudent) => Promise<void>;
    };
  }
}
