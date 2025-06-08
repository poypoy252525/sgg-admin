import { Subject } from "generated/prisma";
import { create } from "zustand";

interface Store {
  subjects: Subject[];
  refresh: () => Promise<void>;
  setSubjects: (subjects: Subject[]) => void;
}

export const useSubjectStore = create<Store>((set) => ({
  subjects: [],
  refresh: async () => {
    const subjects = await window.electron.getSubjects();
    set({ subjects });
  },
  setSubjects: (subjects) => set({ subjects }),
}));
