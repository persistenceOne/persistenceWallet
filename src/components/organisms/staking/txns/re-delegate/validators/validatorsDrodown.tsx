import React, { useEffect, useState } from "react";
import { useAppStore } from "../../../../../../../store/store";
import { ValidatorProps } from "../../../../../../helpers/types";
import { ValidatorTypes } from "../../../index";
import Dropdown from "../../../../../molecules/dropdown";

interface Props {
  activeValidatorsType: ValidatorTypes;
}

const ValidatorsDropdown = ({ activeValidatorsType }: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const validator = useAppStore(
    (state) => state.transactions.reDelegate.validator
  );
  const handleReDelegateTxnValidator = useAppStore(
    (state) => state.handleReDelegateTxnValidator
  );
  const validatorsInfo = useAppStore((state) => state.wallet.validatorsInfo);
  const [data, setData] = useState<ValidatorProps[] | null>(null);

  useEffect(() => {
    if (activeValidatorsType === "active") {
      setData(validatorsInfo!.activeValidators!);
    } else {
      setData(validatorsInfo!.inActiveValidators);
    }
  }, [validatorsInfo, activeValidatorsType]);

  const renderCondition =
    (activeValidatorsType === "active" &&
      data?.length === validatorsInfo!.activeValidators.length!) ||
    (activeValidatorsType === "in-active" &&
      data?.length === validatorsInfo.inActiveValidators.length);

  const dropCloseDownHandler = (value: boolean) => {
    setShow(value);
  };

  const dropDownHandler = (item: ValidatorProps) => {
    handleReDelegateTxnValidator(item);
    setShow(false);
  };

  return (
    <div className="text-light-emphasis w-full rounded-md">
      <Dropdown
        className="text-light-high w-full"
        dropDownVariant="custom"
        closeDropdown={show}
        closeHandler={(value) => dropCloseDownHandler(value)}
        dropdownLabel={
          <div className="flex items-center">
            <span className="text-sm text-light-emphasis font-medium leading-normal md:text-xsm md:ml-2">
              {validator
                ? `${validator.validatorName} (${validator.commission}%)`
                : "select validator"}
            </span>
          </div>
        }
        dropDownButtonClass="cursor-pointer py-3 px-4 bg-black-600 justify-between text-[12px] text-light-emphasis rounded-md"
        dropdownType={"click"}
        staticBackDrop={false}
        dropDownIcon={true}
        dropDownContentClass="!bg-[#282828] drop-shadow-md round-md py-1 md:p-0 h-[150px] overflow-auto"
      >
        {data && data.length > 0 && renderCondition
          ? data.map((item, index) =>
              validator?.validatorName !== item!.validatorName ? (
                <div key={index}>
                  <div
                    className="px-4 py-2 flex items-center md:py-3
                        hover:cursor-pointer hover:bg-[#383838] text-dark-high whitespace-nowrap"
                    key={1}
                    onClick={() => {
                      dropDownHandler(item);
                    }}
                  >
                    <div className="flex justify-between w-full">
                      <p className="text-sm text-light-emphasis font-medium leading-normal md:text-xsm md:ml-2">
                        {item.validatorName}
                      </p>
                      <p className="text-sm text-light-emphasis font-medium leading-normal md:text-xsm md:ml-2">
                        <span className="text-sm">commission - </span>
                        {item.commission}%
                      </p>
                    </div>
                  </div>
                </div>
              ) : null
            )
          : null}
      </Dropdown>
    </div>
  );
};

export default ValidatorsDropdown;
