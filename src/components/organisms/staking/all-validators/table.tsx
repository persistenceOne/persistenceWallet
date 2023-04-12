import { useSortableTable } from "../../../../customHooks/useSortableTable";
import TableHead from "../../../molecules/table/table-head";
import TableBody from "../../../molecules/table/table-body";
import { TableProps } from "../../../molecules/table/types";
import Avatar from "../avatar";
import { useAppStore } from "../../../../../store/store";
import { ValidatorProps } from "../../../../helpers/types";

const Table = ({ data, columns }: TableProps) => {
  const [tableData, handleSorting] = useSortableTable(data, columns);
  const handleStakingValidator = useAppStore(
    (state) => state.handleStakingValidator
  );
  const handleStakingModal = useAppStore((state) => state.handleStakingModal);

  const handleValidators = (item: ValidatorProps) => {
    handleStakingValidator(item);
    handleStakingModal(true);
  };
  const updateData: any[] = [];
  tableData.length
    ? tableData.map((data: any, index: number) =>
        updateData.push({
          validatorName: (
            <div className="flex items-center">
              <Avatar
                identity={data.validatorImage}
                validatorName={data.validatorName}
              />
              <p key={index} className="ml-4">
                {data.validatorName}
              </p>
            </div>
          ),
          votingPower: <p key={index}>{data.votingPower}</p>,
          commission: <p key={index}>{data.commission}%</p>,
          actions: (
            <button
              key={index}
              onClick={() => {
                handleValidators(data);
              }}
            >
              actions
            </button>
          ),
        })
      )
    : [];
  return (
    <>
      <table className="w-full">
        <TableHead {...{ columns, handleSorting }} />
        <TableBody {...{ columns, tableData: updateData }} />
      </table>
    </>
  );
};

export default Table;
