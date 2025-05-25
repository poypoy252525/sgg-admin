import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const PageTitle = ({ children }: Props) => {
  return <div className="text-2xl font-bold tracking-tight">{children}</div>;
};

export default PageTitle;
