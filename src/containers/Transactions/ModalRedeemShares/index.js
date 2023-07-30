import { Modal as ReactModal, OverlayTrigger, Popover } from "react-bootstrap";
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
        console.log(share, "share");
        const item = validator.list.find(
          (f) => f.recordId.toNumber() === share.recordId.toNumber()
        );
        console.log(item, "item123");
        if (item) {
          const newObje = {
            ...item,
            rewardAmount: share.reward
          };
          filteredRewardsList.push(newObje);
        }
      });

      // validator.list.forEach((el) =>
      // {
      //
      //   sharesRewardsList.forEach((share) => {
      //     validator.list.find((f) => {
      //       f.reward === share.reward
      //     }
      //     if (share.recordId === el.recordId) {
      //       const newObje = {
      //         ...el,
      //         rewardAmount: share.reward
      //       };
      //
      //       console.log(
      //           list,
      //       list.push(newObje);
      //     }
      //   });
      // });

      // const arrayFiltered = validator.list.filter((el) => {
      //   return sharesRewardsList.some((f) => {
      //     return f.recordId.toNumber() === el.recordId.toNumber();
      //   });
      // });
      //
      // const filteredRewardsList = sharesRewardsList.filter((el) => {
      //   return validator.list.some((f) => {
      //     return f.recordId.toNumber() === el.recordId.toNumber();
      //   });
      // });

      const totalCount = filteredRewardsList.reduce((accumulator, object) => {
        return accumulator + object.rewardAmount;
      }, 0);

      console.log(
        filteredRewardsList,
        totalCount,
        "myArrayFiltered",
        validator,
        sharesRewardsList
      );
      setRewardList(filteredRewardsList);
      setTotalRewards(totalCount);
      // const totalRewards = sharesRewardsList.
    }
  }, [sharesRewardsList, validator]);

  console.log(show, "showshow", validator, sharesRewardsList);
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
          <div className="available-tokens">
            <div className="moniker-box d-flex align-items-center">
              <Avatar
                identity={validator.validatorImage && validator.validatorImage}
              />
              <div className="info">
                <p className="name m-0">
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
                  <p className="name m-0">
                    {truncateToFixedDecimalPlaces(totalRewards)} XPRT
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="table-container border">
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
                    <td className="address pl-5">
                      {stringTruncate(item.owner)}
                    </td>
                    <td className="d-flex  name">
                      <Avatar identity={validator.validatorImage} />
                      {validator.validatorName}
                    </td>
                    <td className="text-center amount">{item.amount}</td>
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
