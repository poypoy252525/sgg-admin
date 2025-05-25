import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const PageDescription = ({ children }: Props) => {
  return <div className="text-muted-foreground">{children}</div>;
};

export default PageDescription;
