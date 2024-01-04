import React from "react";
import TokenInfo from "../Common/TokenInfo";
import ModalValidator from "./Validators/ModalValidator";
import ModalDelegate from "../Transactions/ModalDelegate";
import ModalTokenize from "../Transactions/ModalTokenize";
import FeeModal from "../Common/Fee/Modal";
import KeyStoreModal from "../Common/KeyStore/Modal";
import ModalViewTxnResponse from "../Common/ModalViewTxnResponse";
import ModalReDelegate from "../Transactions/ModalReDelegate";
import ModalUnbond from "../Transactions/ModalUnbond";
import ModalValidatorWithdraw from "../Transactions/ModalWithdrawValidatorRewards";
import ModalWithDraw from "../Transactions/ModalWithDrawAllRewards";
import ModalSetWithdrawAddress from "../Transactions/ModalSetWithdrawAddress";
import Loader from "../../components/Loader";
import ModalRedeemShares from "../Transactions/ModalRedeemShares";
import ModalTransferShares from "../Transactions/ModalTransferShares";
import StakingTabs from "./StakingTabs";

const Staking = () => {
  return (
    <div className="staking-main-section">
      <Loader />
      <ModalValidator />
      <ModalDelegate />
      <ModalReDelegate />
      <ModalRedeemShares />
      <ModalTransferShares />
      <ModalTokenize />
      <TokenInfo />
      <FeeModal />
      <KeyStoreModal />
      <ModalUnbond />
      <ModalWithDraw />
      <ModalViewTxnResponse />
      <ModalValidatorWithdraw />
      <ModalSetWithdrawAddress />
      <StakingTabs />
    </div>
  );
};
export default Staking;
