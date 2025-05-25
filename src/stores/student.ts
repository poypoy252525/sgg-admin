import { Course, Student } from "generated/prisma";
import { create } from "zustand";

interface Store {
  list: (Student & { course: Course })[];
  setStudents: (students: (Student & { course: Course })[]) => void;
}

export const useStudentStore = create<Store>((set) => ({
  list: [],
  setStudents: (students) => set({ list: students }),
}));
