import React, { useEffect, useState } from "react";
import Dropdown from "../../../../molecules/dropdown";
import { useAppStore } from "../../../../../../store/store";
import { RewardsList, ValidatorProps } from "../../../../../helpers/types";
import { defaultChain } from "../../../../../helpers/utils";
import Avatar from "../../avatar";

interface DataState extends RewardsList {
  selected: boolean;
}

const Validators = () => {
  const [show, setShow] = useState<boolean>(false);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [selected, setSelected] = useState<DataState[]>([]);

  const [balances, token, rewardsInfo, validatorsInfo] = useAppStore(
    (state) => [
      state.wallet.balances,
      state.transactions.send.token,
      state.wallet.rewardsInfo,
      state.wallet.validatorsInfo,
    ]
  );

  const [data, setData] = useState<DataState[] | []>([]);

  useEffect(() => {
    const filteredList: DataState[] = [];
    if (rewardsInfo.rewardsList.length > 0) {
      rewardsInfo.rewardsList.forEach((item: RewardsList, index) => {
        const response: ValidatorProps | undefined =
          validatorsInfo.validators.find(
            (validator) => validator.validatorAddress === item.validatorAddress
          );
        if (response) {
          filteredList.push({
            reward: item.reward,
            validatorAddress: item.validatorAddress,
            validatorName: response.validatorName,
            validatorImage: response.validatorImage,
            selected: false,
          });
        }
      });
    }
    console.log(filteredList, "filteredList");

    setData(filteredList);
  }, [rewardsInfo]);

  const dropCloseDownHandler = (value: boolean) => {
    setShow(value);
  };

  const dropDownHandler = (item: DataState) => {
    // handleSendTxnToken(item);
    // setShow(false);
    const sortList = data;
    const objIndex = sortList!.findIndex(
      (obj) => obj.validatorAddress === item.validatorAddress
    );

    if (sortList[objIndex].selected === false) {
      const newList: DataState[] = selected;
      newList.push(item);
      setSelected([...newList]);
      setTotalAmount(Number(item.reward.amount.toString()) + totalAmount);
    } else {
      setTotalAmount(totalAmount - Number(item.reward.amount.toString()));
      setSelected(
        selected.filter(function (selectedItem) {
          return selectedItem.validatorAddress !== item.validatorAddress;
        })
      );
    }

    sortList[objIndex].selected = !sortList[objIndex].selected;
    setData([...sortList]);
  };

  console.log(data, "data");
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1 ">
        <p className="text-light-white-500">Select Validator</p>
        <p className="text-light-white-500 underline">
          {totalAmount}&nbsp;
          {defaultChain.currency.coinDenom}
        </p>
      </div>

      <Dropdown
        className="text-light-high w-full"
        dropDownVariant="custom"
        closeDropdown={show}
        closeHandler={(value) => dropCloseDownHandler(value)}
        dropdownLabel={
          <div className="flex items-center">
            <>
              Selected
              <span className="text-light-emphasis font-medium leading-normal md:text-xsm ml-1">
                ({selected.length})
              </span>
            </>
          </div>
        }
        dropDownButtonClass="cursor-pointer py-3 px-4 bg-black-600 justify-between text-[12px] text-light-emphasis rounded-md"
        dropdownType={"click"}
        staticBackDrop={false}
        dropDownIcon={true}
        dropDownContentClass="!bg-[#282828] drop-shadow-md round-md"
      >
        {data!.length > 0 &&
          data!.map((item: DataState, index: number): any => (
            <div key={index}>
              <div
                className="px-4 py-2 flex items-center md:py-3
                        hover:cursor-pointer hover:bg-[#383838] text-dark-high whitespace-nowrap"
                onClick={() => {
                  dropDownHandler(item);
                }}
              >
                <div className="flex justify-between w-full">
                  <div className="flex items-center">
                    <input
                      type={"checkbox"}
                      checked={item.selected}
                      className="mr-2"
                    />
                    <Avatar
                      identity={item.validatorImage!}
                      validatorName={item.validatorName}
                      width={"20px"}
                    />
                    <span className="text-sm text-light-emphasis font-medium leading-normal md:text-xsm ml-2">
                      {item.validatorName}
                    </span>
                  </div>
                  <p className="text-sm text-light-emphasis font-medium leading-normal md:text-xsm md:ml-2">
                    {item.reward.amount.toString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </Dropdown>
    </div>
  );
};

export default Validators;
