import { Table } from "@tanstack/react-table";
import { Input } from "./ui/input";

interface Props<T> {
  table: Table<T>;
  column: keyof T;
}

const DataTableFilter = <T,>({ table, column }: Props<T>) => {
  return (
    <Input
      placeholder="Filter name..."
      value={(table.getColumn(column)?.getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getColumn(column)?.setFilterValue(event.target.value)
      }
      className="max-w-sm"
    />
  );
};

export default DataTableFilter;
