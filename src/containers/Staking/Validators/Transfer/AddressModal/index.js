import React from "react";
import { Modal as ReactModal, OverlayTrigger, Popover } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { handleDelegationTransferModal } from "../../../../../store/actions/transactions/delegationTransfer";
import ToAddress from "./ToAddress";
import Icon from "../../../../../components/Icon";
import { useTranslation } from "react-i18next";
import Avatar from "../../Avatar";
import Submit from "./submitButton";

const AddressModal = () => {
  const { t } = useTranslation();
  const modal = useSelector((state) => state.delegationTransfer.modal);
  const dispatch = useDispatch();
  const list = useSelector((state) => state.delegationTransfer.list);

  console.log(list, "list1");
  const handleClose = () => {
    dispatch(handleDelegationTransferModal(false));
  };

  const popover = (
    <Popover id="popover">
      <Popover.Content>
        {list.map((item, index) => (
          <div key={index} className={"d-flex align-items-center"}>
            <Avatar identity={item.identity} />
            <p className="mb-0 mt-1 ml-1">{item.name}</p>
          </div>
        ))}
      </Popover.Content>
    </Popover>
  );

  return (
    <ReactModal
      animation={false}
      backdrop="static"
      className="modal-custom delegate-modal modal-redelegate"
      centered={true}
      keyboard={false}
      show={modal}
      onHide={handleClose}
    >
      <ReactModal.Header closeButton>
        <h3 className="heading">Transferring Staked XPRT</h3>
      </ReactModal.Header>
      <ReactModal.Body className="delegate-modal-body">
        <div className="form-field d-flex align-items-center mb-3">
          <p className="label info m-0">
            {t("SELECTED_VALIDATORS")}
            <OverlayTrigger
              trigger={["hover", "focus"]}
              placement="bottom"
              overlay={popover}
            >
              <button className="icon-button info" type="button">
                <Icon viewClass="arrow-right" icon="info" />
              </button>
            </OverlayTrigger>
            :
          </p>
          <p className={"value mb-0 ml-2"}>{list.length}</p>
        </div>
        <ToAddress />
        <Submit />
      </ReactModal.Body>
    </ReactModal>
  );
};

export default AddressModal;
