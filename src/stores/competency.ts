import { Competency } from "generated/prisma";
import { create } from "zustand";

interface Store {
  competencies: Competency[];
  refresh: () => Promise<void>;
}

export const useCompetencyStore = create<Store>((set) => ({
  competencies: [],
  refresh: async () => {
    try {
      const competencies = await window.electron.getCompetencies();
      set({ competencies });
    } catch (error) {
      console.error(error);
    }
  },
}));
