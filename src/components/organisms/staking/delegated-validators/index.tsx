import React, { useEffect, useState } from "react";
import { TableColumnsProps } from "../../../molecules/table/types";
import Table from "./table";
import { useAppStore } from "../../../../../store/store";
import { GetDelegatedValidatorInfo } from "../../../../helpers/types";

const DelegatedValidators = () => {
  const validatorsInfo = useAppStore((state) => state.wallet.validatorsInfo);
  const [data, setData] = useState<GetDelegatedValidatorInfo[] | null>(null);

  useEffect(() => {
    setData(validatorsInfo!.delegatedValidators!);
  }, [validatorsInfo]);

  const columns: TableColumnsProps[] = [
    {
      label: "Validator",
      accessor: "validatorName",
      sortable: true,
      sortbyOrder: "asc",
    },
    { label: "DelegatedAmount", accessor: "delegatedAmount", sortable: true },
    { label: "Actions", accessor: "actions", sortable: false },
  ];

  console.log(data, "delegatedValidators");
  return (
    <div className="text-light-emphasis w-full rounded-md px-6">
      {data && data.length > 0 ? <Table data={data} columns={columns} /> : ""}
    </div>
  );
};

export default DelegatedValidators;
