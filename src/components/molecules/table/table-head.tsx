import { useState } from "react";
import { TableHeadProps } from "./types";
import { emptyFunc } from "../../../helpers/utils";
import { Icon } from "../../atoms/icon";

const TableHead = ({ columns, handleSorting }: TableHeadProps) => {
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

  const handleSortingChange = (accessor: string) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  return (
    <thead>
      <tr className="h-14">
        {columns.map(({ label, accessor, sortable }) => {
          const cl = sortable
            ? sortField === accessor && order === "asc"
              ? "up"
              : sortField === accessor && order === "desc"
              ? "down"
              : "default"
            : "";
          return (
            <th
              key={accessor}
              onClick={
                sortable ? () => handleSortingChange(accessor) : emptyFunc
              }
              className={`${cl} px-2 text-left`}
            >
              <div className="flex items-center cursor-pointer">
                {label}
                {sortable ? (
                  <Icon
                    iconName={"double-arrow"}
                    viewClass={`${
                      cl === "up" ? "fill-[#A6A6A6]" : "fill-[#2b2b2b]"
                    } ml-1`}
                  />
                ) : (
                  ""
                )}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
