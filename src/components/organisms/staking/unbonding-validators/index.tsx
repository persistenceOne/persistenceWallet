import React, { useEffect, useState } from "react";
import { TableColumnsProps } from "../../../molecules/table/types";
import Table from "./table";
import { useAppStore } from "../../../../../store/store";
import {
  GetDelegatedValidatorInfo,
  UnBondingList,
} from "../../../../helpers/types";

const UnbondValidators = () => {
  const validatorsInfo = useAppStore((state) => state.wallet.validatorsInfo);
  const unBondingInfo = useAppStore((state) => state.wallet.unBondingInfo);
  const [data, setData] = useState<UnBondingList[] | null>(null);

  useEffect(() => {
    const filteredList: UnBondingList[] = [];
    if (
      validatorsInfo.delegatedValidators.length > 0 &&
      unBondingInfo.unBondingList.length > 0
    ) {
      unBondingInfo.unBondingList.forEach((item, index) => {
        const response: GetDelegatedValidatorInfo | undefined =
          validatorsInfo.delegatedValidators.find(
            (validator) => validator.validatorAddress === item.validatorAddress
          );
        if (response) {
          filteredList.push({
            id: index + 1,
            balance: item.balance,
            completionTime: item.completionTime,
            validatorAddress: item.validatorAddress,
            validatorName: response.validatorName,
            validatorImage: response.validatorImage,
          });
        }
      });
    }
    console.log(filteredList, "filteredList");

    setData(filteredList);
  }, [validatorsInfo]);

  const columns: TableColumnsProps[] = [
    {
      label: "Validator",
      accessor: "validatorName",
      sortable: true,
      sortbyOrder: "asc",
    },
    { label: "Unbond Amount", accessor: "balance", sortable: true },
    { label: "Unbond Time", accessor: "completionTime", sortable: true },
  ];

  console.log(data, "UnbondValidators1");
  return (
    <div className="text-light-emphasis w-full rounded-md px-6">
      {data && data.length > 0 ? <Table data={data} columns={columns} /> : ""}
    </div>
  );
};

export default UnbondValidators;
