import { TableBodyProps } from "./types";

const TableBody = ({ tableData, columns }: TableBodyProps) => {
  return (
    <tbody>
      {tableData.map((data: any) => {
        return (
          <tr key={data.id} className="h-14">
            {columns.map(({ accessor }) => {
              const tData = data[accessor] ? data[accessor] : "——";
              return (
                <td className={`px-2`} key={accessor}>
                  {tData}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
