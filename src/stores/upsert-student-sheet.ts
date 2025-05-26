import { create } from "zustand";

interface Store {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useUpsertStudentSheetStore = create<Store>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));
