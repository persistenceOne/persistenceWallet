import React, { useEffect, useState } from "react";
import { useAppStore } from "../../../../../../store/store";
import Modal from "../.././../../molecules/modal";
import { shallow } from "zustand/shallow";
import Amount from "./amount";
import FeeOptions from "../../../common/fee";
import Submit from "./submit";
import { Icon } from "../../../../atoms/icon";
import Validators, { DataState } from "./validators";
import { defaultChain, persistenceChain } from "../../../../../helpers/utils";
import { CoinPretty } from "@keplr-wallet/unit";
import { emptyPrettyCoin } from "../../../../../../store/slices/wallet";
import { getValidatorCommission } from "../../../../../pages/api/rpcQueries";

const ClaimModal = () => {
  const [selected, setSelected] = useState<DataState[]>([]);
  const [selectedCommission, setSelectedCommission] = useState<boolean>(false);

  const [accountDetails, modal, rewardsInfo, validatorsInfo, commission] =
    useAppStore(
      (state) => [
        state.wallet.accountDetails,
        state.transactions.claim.modal,
        state.wallet.rewardsInfo,
        state.wallet.validatorsInfo,
        state.wallet.validatorCommission,
      ],
      shallow
    );

  const fetchValidatorCommission = useAppStore(
    (state) => state.fetchValidatorCommission
  );

  useEffect(() => {
    if (validatorsInfo.validators.length > 0) {
      fetchValidatorCommission(
        validatorsInfo!.validators!,
        accountDetails!.address!,
        persistenceChain!.rpc
      );
    }
  }, [validatorsInfo]);
  const handleClaimTxnModal = useAppStore((state) => state.handleClaimTxnModal);

  const handleClose = () => {
    handleClaimTxnModal(false);
  };

  return (
    <Modal
      show={modal}
      onClose={handleClose}
      header=""
      modalBodyClassName={"!p-0"}
      modalDialogClassName={"!max-w-[600px]"}
      staticBackDrop={true}
      closeButton={true}
    >
      <div className="px-8 pt-8 md:px-6 md:pt-6">
        <p className="text-center text-light-high font-semibold text-2xl leading-normal">
          Claim Rewards
        </p>
      </div>
      <div className="px-8 py-6">
        <div className="flex items-center mb-4">
          <p className="text-center text-light-high font-semibold leading-normal mr-4">
            Claimable Rewards:
          </p>
          <p className="text-center text-light-emphasis font-semibold leading-normal">
            {rewardsInfo.totalAmount.toString()}{" "}
            {defaultChain.currency.coinDenom}
          </p>
        </div>
        {!commission.isValidator ? (
          <div className="flex items-center mb-4">
            <input
              type={"checkbox"}
              checked={selectedCommission}
              onChange={() => {
                setSelectedCommission(!selectedCommission);
              }}
              className={"mr-2"}
            />
            <div className="flex items-center ">
              <p className="text-center text-light-high font-semibold leading-normal mr-4">
                Claimable Commission:
              </p>
              <p className="text-center text-light-emphasis font-semibold leading-normal">
                {commission.commission.toString()}{" "}
                {defaultChain.currency.coinDenom}
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
        <Validators setSelected={setSelected} selected={selected} />
        <FeeOptions amount={"0"} />
        <Submit selected={selected} selectedCommission={selectedCommission} />
      </div>
    </Modal>
  );
};

export default ClaimModal;
