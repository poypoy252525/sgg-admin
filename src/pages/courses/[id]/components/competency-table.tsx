import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCompetencyStore } from "@/stores/competency";
import { useEffect } from "react";

const CompetencyTable = () => {
  const competencies = useCompetencyStore((state) => state.competencies);
  const refreshCompetencies = useCompetencyStore((state) => state.refresh);

  useEffect(() => {
    refreshCompetencies();
  }, [refreshCompetencies]);
  return (
    <Table>
      <TableCaption>A list of Competency</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Duration</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {competencies.map((competency) => (
          <TableRow key={competency.id}>
            <TableCell className="font-medium">{competency.id}</TableCell>
            <TableCell>{competency.name}</TableCell>
            <TableCell>
              <Badge variant="secondary">{competency.type.toLowerCase()}</Badge>
            </TableCell>
            <TableCell className="text-right">{competency.duration}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CompetencyTable;
