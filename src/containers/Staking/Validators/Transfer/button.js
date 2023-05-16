import React, { useEffect, useState } from "react";
import Button from "../../../../components/Button";
import {
  handleDelegationTransferModal,
  setTxDelegationTransferList,
  submitFormData
} from "../../../../store/actions/transactions/delegationTransfer";
import { useDispatch } from "react-redux";
import { RedeemDelegationTransferMsg } from "../../../../utils/protoMsgHelper";

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
    dispatch(handleDelegationTransferModal(true));
    dispatch(setTxDelegationTransferList(selectedList));
  };
  const onClickClaim = () => {
    const msg = RedeemDelegationTransferMsg(
      "persistence1wv9879c57ag7zthrtcvundrw3yvvt0a92wmmhq",
      "persistencevaloper1qhx8lgm9a0kfxptwgcftjt32w0a00lh5z9zf3y/6",
      1000000
    );
    dispatch(submitFormData([msg]));
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
      <Button
        className={`button button-primary ml-2`}
        type="button"
        value="Claim"
        onClick={onClickClaim}
      />
    </div>
  );
};

export default Submit;
