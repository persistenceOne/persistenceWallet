import React, { useEffect, useState } from "react";
import Button from "../../../../components/Button";
import {
  handleDelegationTokenizeModal,
  setTxDelegationTransferList
} from "../../../../store/actions/transactions/delegationTransfer";
import { useDispatch } from "react-redux";

const Submit = ({ inputState, totalAmount, selectedList }) => {
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (inputState.length) {
      const amount = inputState.find((item) => {
        return Number(item.inputAmount) > Number(item?.amount);
      });
      if (amount) {
        setError(true);
      } else {
        setError(false);
      }
    }
  }, [inputState]);

  const onClick = () => {
    dispatch(handleDelegationTokenizeModal(true));
    dispatch(setTxDelegationTransferList(selectedList));
  };

  return (
    <div className="button-section">
      <Button
        className={`button button-primary`}
        type="button"
        disable={error || Number(totalAmount) <= 0}
        value="Transfer"
        onClick={onClick}
      />
    </div>
  );
};

export default Submit;
