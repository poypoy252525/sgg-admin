import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  actions?: ReactNode;
}

const PageHeader = ({ children, actions }: Props) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col">{children}</div>
      <div>{actions}</div>
    </div>
  );
};

export default PageHeader;
