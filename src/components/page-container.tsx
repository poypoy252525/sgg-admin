import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const PageContainer = ({ children }: Props) => {
  return <div className="container mx-auto p-6">{children}</div>;
};

export default PageContainer;
