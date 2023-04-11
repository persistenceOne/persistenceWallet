import React, { useEffect, useState } from "react";
import { TableColumnsProps } from "../../../molecules/table/types";
import Table from "./table";
import { useAppStore } from "../../../../../store/store";
import { ValidatorProps } from "../../../../helpers/types";
import { ValidatorTypes } from "../index";

interface Props {
  activeValidatorsType: ValidatorTypes;
}

const AllValidators = ({ activeValidatorsType }: Props) => {
  const validatorsInfo = useAppStore((state) => state.wallet.validatorsInfo);
  const [data, setData] = useState<ValidatorProps[] | null>(null);

  useEffect(() => {
    if (activeValidatorsType === "active") {
      setData(validatorsInfo!.activeValidators!);
    } else {
      setData(validatorsInfo!.inActiveValidators);
    }
  }, [validatorsInfo, activeValidatorsType]);

  const columns: TableColumnsProps[] = [
    {
      label: "Validator",
      accessor: "validatorName",
      sortable: true,
      sortbyOrder: "asc",
    },
    { label: "votingPower", accessor: "votingPower", sortable: true },
    {
      label: "Commission",
      accessor: "commission",
      sortable: true,
    },
    { label: "Actions", accessor: "actions", sortable: false },
  ];

  const renderCondition =
    (activeValidatorsType === "active" &&
      data?.length === validatorsInfo!.activeValidators.length!) ||
    (activeValidatorsType === "in-active" &&
      data?.length === validatorsInfo.inActiveValidators.length);

  return (
    <div className="text-light-emphasis w-full rounded-md px-6">
      {data && data.length > 0 && renderCondition ? (
        <Table data={data} columns={columns} />
      ) : (
        ""
      )}
    </div>
  );
};

export default AllValidators;
