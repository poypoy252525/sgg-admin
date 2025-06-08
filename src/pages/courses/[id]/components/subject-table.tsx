import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Subject } from "generated/prisma";

interface Props {
  subjects: Subject[];
}

const SubjectTable = ({ subjects }: Props) => {
  return (
    <Table>
      <TableCaption>List of subject in ALS</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>name</TableHead>
          <TableHead>type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subjects.map((subject) => (
          <TableRow key={subject.id}>
            <TableCell className="font-medium">{subject.id}</TableCell>
            <TableCell>{subject.name}</TableCell>
            <TableCell>{subject.type.replace("_", " ")}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SubjectTable;
