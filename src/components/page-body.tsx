import { ReactNode } from "react";

const PageBody = ({ children }: { children: ReactNode }) => {
  return <main className="flex-1 overflow-y-auto">{children}</main>;
};

export default PageBody;
