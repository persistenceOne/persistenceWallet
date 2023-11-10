import {
  Modal as ReactModal,
  OverlayTrigger,
  Popover,
  Table
} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Icon from "../../../components/Icon";
import { useDispatch, useSelector } from "react-redux";
import { hideTxRedeemSharesModal } from "../../../store/actions/transactions/redeemShares";
import ButtonRedeem from "./ButtonRedeem";
import Memo from "./Memo";
import { LOGIN_INFO } from "../../../constants/localStorage";
import Avatar from "../../Staking/Validators/Avatar";
import { stringTruncate } from "../../../utils/scripts";
import { truncateToFixedDecimalPlaces } from "../../../utils/helper";
import { txFailed } from "../../../store/actions/transactions/common";

const ModalRedeemShares = () => {
  const dispatch = useDispatch();
  const [totalRewards, setTotalRewards] = useState(0);
  const [rewardList, setRewardList] = useState([]);
  const validator = useSelector((state) => state.redeemShares.validator.value);
  const show = useSelector((state) => state.redeemShares.modal);

  const sharesRewardsList = useSelector(
    (state) => state.tokenizeSharesInfo.sharesRewardsList
  );

  useEffect(() => {
    if (
      sharesRewardsList.length > 0 &&
      validator.list &&
      validator.list.length > 0
    ) {
      const filteredRewardsList = [];
      sharesRewardsList.forEach((share) => {
        const item = validator.list.find(
          (f) => Number(f.recordId) === Number(share.recordId)
        );
        if (item) {
          const newObje = {
            ...item,
            rewardAmount: share.reward
          };
          filteredRewardsList.push(newObje);
        }
      });
      const totalCount = filteredRewardsList.reduce((accumulator, object) => {
        return accumulator + object.rewardAmount;
      }, 0);
      setRewardList(filteredRewardsList);
      setTotalRewards(totalCount);
    }
  }, [sharesRewardsList, validator]);

  const response = useSelector((state) => state.common.error);
  const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));

  const handleClose = () => {
    dispatch(txFailed(""));
    dispatch(hideTxRedeemSharesModal());
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>
        Converts previously transferred or tokenised staked assets back into
        regular staked assets. Related staking rewards will be automatically
        claimed.
      </Popover.Content>
    </Popover>
  );

  return show ? (
    <ReactModal
      animation={false}
      backdrop="static"
      className="modal-custom delegate-modal modal-delegate modal-redeem"
      centered={true}
      keyboard={false}
      show={show}
      onHide={handleClose}
    >
      <ReactModal.Header closeButton>
        <h3 className="heading">
          Redeeming Staked XPRT{" "}
          <OverlayTrigger
            trigger={["hover", "focus"]}
            placement="bottom"
            overlay={popover}
          >
            <button className="icon-button info" type="button">
              <Icon viewClass="arrow-right" icon="info" />
            </button>
          </OverlayTrigger>
        </h3>
      </ReactModal.Header>
      <ReactModal.Body className="delegate-modal-body">
        <div className="form-field d-flex align-items-center mb-3">
          <p className="label mr-3 mb-0">Selected Validator</p>
          <div className="available-tokens text-secondary">
            <div className="moniker-box d-flex align-items-center">
              <Avatar
                identity={validator.validatorImage && validator.validatorImage}
              />
              <div className="info">
                <p className="name m-0 text-secondary">
                  {validator.validatorName && validator.validatorName}
                </p>
              </div>
            </div>
          </div>
        </div>
        {totalRewards > 0 ? (
          <div className="form-field d-flex align-items-center mb-3">
            <p className="label mr-3 mb-0">Total Rewards</p>
            <div className="available-tokens">
              <div className="moniker-box d-flex align-items-center">
                <div className="info">
                  <p className="name m-0 text-secondary">
                    {truncateToFixedDecimalPlaces(totalRewards)} XPRT
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="table-container border mb-2">
          <Table borderless className="m-0">
            <thead>
              <tr>
                <th className="pl-5">From Address</th>
                <th className="">Validator</th>
                <th className="text-center">Amount(XPRT)</th>
              </tr>
            </thead>
            <tbody>
              {validator.list.length > 0 &&
                validator.list.map((item, index) => (
                  <tr key={index}>
                    <td className="address pl-5 text-secondary">
                      {stringTruncate(item.owner)}
                    </td>
                    <td className="d-flex name text-secondary">
                      <Avatar identity={validator.validatorImage} />
                      {validator.validatorName}
                    </td>
                    <td className="text-center amount text-secondary">
                      {item.tokens}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
        {loginInfo && loginInfo.loginMode !== "keplr" ? <Memo /> : null}
        {response.error.message !== "" ? (
          <p className="form-error">{response.error.message}</p>
        ) : null}
        <ButtonRedeem
          tokenizedShares={validator.list}
          rewardList={rewardList}
        />
      </ReactModal.Body>
    </ReactModal>
  ) : (
    ""
  );
};

export default ModalRedeemShares;
