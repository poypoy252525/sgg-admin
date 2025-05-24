export {};

declare global {
  interface Window {
    electron: {
      getStudents: () => Promise<string>;
    };
  }
}
