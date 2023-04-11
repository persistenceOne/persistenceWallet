import { TableProps } from "./types";
import TableBody from "./table-body";
import TableHead from "./table-head";
import { useSortableTable } from "../../../customHooks/useSortableTable";

const Table = ({ data, columns }: TableProps) => {
  const [tableData, handleSorting] = useSortableTable(data, columns);
  return (
    <>
      <table className="table">
        <TableHead {...{ columns, handleSorting }} />
        <TableBody {...{ columns, tableData }} />
      </table>
    </>
  );
};

export default Table;
