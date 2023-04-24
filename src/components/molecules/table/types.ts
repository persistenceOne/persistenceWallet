import {
  GetDelegatedValidatorInfo,
  UnBondingList,
  ValidatorProps,
} from "../../../helpers/types";

export interface TableColumnsProps {
  label: string;
  accessor:
    | keyof ValidatorProps
    | keyof GetDelegatedValidatorInfo
    | keyof UnBondingList;
  sortable: boolean;
  sortbyOrder?: "asc" | "desc";
}

export interface TableProps {
  data: any;
  columns: TableColumnsProps[];
}

export interface TableHeadProps {
  handleSorting: any;
  columns: TableColumnsProps[];
}

export interface TableBodyProps {
  tableData: any;
  columns: TableColumnsProps[];
}
