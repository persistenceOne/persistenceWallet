import React from "react";
import { useAppStore } from "../../../../../store/store";
import Modal from "../../../molecules/modal";
import { shallow } from "zustand/shallow";
import Button from "../../../atoms/button";
import { TransactionNames } from "../../../../../store/slices/transactions";
import { toDec } from "../../../../helpers/coin";

const TransactionModal = () => {
  const [stakingModal, selectedValidator, delegatedValidators] = useAppStore(
    (state) => [
      state.transactions.staking.stakingModal,
      state.transactions.staking.selectedValidator,
      state.wallet.validatorsInfo.delegatedValidators,
    ],
    shallow
  );
  const delegatedValidator = delegatedValidators.find(
    (item) => item.validatorAddress === selectedValidator!.validatorAddress
  );

  const handleStakingModal = useAppStore((state) => state.handleStakingModal);
  const handleDelegateTxnModal = useAppStore(
    (state) => state.handleDelegateTxnModal
  );
  const handleUnDelegateTxnModal = useAppStore(
    (state) => state.handleUnDelegateTxnModal
  );
  const handleReDelegateTxnModal = useAppStore(
    (state) => state.handleReDelegateTxnModal
  );

  const handleClaimTxnModal = useAppStore((state) => state.handleClaimTxnModal);

  const handleClose = () => {
    handleStakingModal(false);
  };

  const handledTxnModals = (type: TransactionNames) => {
    handleStakingModal(false);
    if (type === "delegate") {
      handleDelegateTxnModal(true);
    } else if (type === "un-delegate") {
      handleUnDelegateTxnModal(true);
    } else if (type === "re-delegate") {
      handleReDelegateTxnModal(true);
    } else if (type === "claim") {
      handleClaimTxnModal(true);
    }
  };

  return (
    <Modal
      show={stakingModal}
      onClose={handleClose}
      header=""
      modalBodyClassName={"!p-0"}
      modalDialogClassName={"!max-w-[600px]"}
      staticBackDrop={true}
      closeButton={true}
    >
      <div className="px-8 py-6">
        <div className="flex items-center mb-4">
          <img
            alt="moniker-image"
            className="w-[40px] h-[40px] rounded-full mr-4"
            src={"/images/profile.svg"}
          />
          <div>
            <p className="text-light-emphasis text-lg font-medium">
              {selectedValidator!.validatorName}
            </p>
            <span className="text-light-mid text-sm">
              commission - {selectedValidator!.commission}%
            </span>
          </div>
        </div>
        <div className="mb-2 flex justify-between items-center">
          <p className="text-light-emphasis">Delegated Amount</p>
          <p className="text-light-mid">
            {delegatedValidator
              ? delegatedValidator.delegatedAmount.toString()
              : 0}{" "}
            XPRT
          </p>
        </div>
        <div className="mb-2">
          <p className="text-light-emphasis">Website</p>
          <a
            href={selectedValidator!.validatorLink}
            target={"_blank"}
            rel="noreferrer"
            className="text-red"
            aria-current="page"
          >
            {selectedValidator!.validatorLink}
          </a>
        </div>
        <div className="mb-4">
          <p className="text-light-emphasis">Description</p>
          <p className="text-light-mid">
            {selectedValidator!.validatorDescription}
          </p>
        </div>
        <div className="flex items-center justify-start">
          <Button
            className="button md:text-sm flex items-center
            justify-center mr-2 mb-4"
            type="primary"
            size="medium"
            disabled={false}
            content="Delegate"
            onClick={() => {
              handledTxnModals("delegate");
            }}
          />
          <Button
            className="button md:text-sm flex items-center
            justify-center mx-2 mb-4"
            type="primary"
            size="medium"
            disabled={false}
            content="UnBond"
            onClick={() => {
              handledTxnModals("un-delegate");
            }}
          />
          {delegatedValidator &&
          delegatedValidator!.delegatedAmount.toDec().gt(toDec("0")) ? (
            <Button
              className="button md:text-sm flex items-center
            justify-center mx-2 mb-4"
              type="primary"
              size="medium"
              disabled={false}
              content="Re-delegate"
              onClick={() => {
                handledTxnModals("re-delegate");
              }}
            />
          ) : (
            ""
          )}
          <Button
            className="button md:text-sm flex items-center
            justify-center mx-2 mb-4"
            type="primary"
            size="medium"
            disabled={false}
            content="Claim Rewards"
            onClick={() => {
              handledTxnModals("claim");
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default TransactionModal;
