import React, { useEffect, useState } from "react";
import { TableColumnsProps } from "../../../molecules/table/types";
import Table from "./table";
import { useAppStore } from "../../../../../store/store";
import {
  GetDelegatedValidatorInfo,
  UnBondingList,
  ValidatorsInfo,
} from "../../../../helpers/types";

const DelegatedValidators = () => {
  const validatorsInfo = useAppStore((state) => state.wallet.validatorsInfo);
  const unBondingInfo = useAppStore((state) => state.wallet.unBondingInfo);
  const [data, setData] = useState<GetDelegatedValidatorInfo[] | null>(null);

  useEffect(() => {
    const filteredList: GetDelegatedValidatorInfo[] = [];
    if (validatorsInfo.delegatedValidators.length > 0) {
      validatorsInfo.delegatedValidators.forEach((item) => {
        if (unBondingInfo.unBondingList.length > 0) {
          const response: UnBondingList | undefined =
            unBondingInfo.unBondingList.find(
              (validator) =>
                validator.validatorAddress !== item.validatorAddress
            );
          if (response) {
            filteredList.push(item!);
          }
        } else {
          filteredList.push(item!);
        }
      });
    }
    setData(filteredList);
  }, [validatorsInfo]);

  const columns: TableColumnsProps[] = [
    {
      label: "Validator",
      accessor: "validatorName",
      sortable: true,
      sortbyOrder: "asc",
    },
    { label: "Delegated Amount", accessor: "delegatedAmount", sortable: true },
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
