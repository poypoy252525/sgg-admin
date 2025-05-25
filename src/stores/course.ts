import { Course, Competency, Student } from "generated/prisma";
import { create } from "zustand";

interface Store {
  courses: (Course & { competencies: Competency[]; students: Student[] })[];
  setCourses: (
    courses: (Course & { competencies: Competency[]; students: Student[] })[]
  ) => void;
}

export const useCourseStore = create<Store>((set) => ({
  courses: [],
  setCourses: (courses) => set({ courses }),
}));
