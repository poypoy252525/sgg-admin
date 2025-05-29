import { ReactNode } from "react";

const PageBody = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex-1 overflow-y-auto styled-scrollbar flex flex-col">
      {children}
    </main>
  );
};

export default PageBody;
