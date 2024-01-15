import React from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import Icon from "../../../components/Icon";
import InputText from "../../../components/InputText";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  validateAddress,
  ValidateAlphaNumeric
} from "../../../utils/validations";
import { setTxTokenizeOwnerAddress } from "../../../store/actions/transactions/tokenizeShares";

const ToAddress = () => {
  const { t } = useTranslation();
  const toAddress = useSelector((state) => state.tokenizeShares.toAddress);
  const dispatch = useDispatch();

  const onChange = (evt) => {
    dispatch(
      setTxTokenizeOwnerAddress({
        value: evt.target.value.toString(),
        error: {
          message: ""
        }
      })
    );
  };

  const onBlur = (evt) => {
    dispatch(
      setTxTokenizeOwnerAddress({
        value: evt.target.value.toString(),
        error: validateAddress(evt.target.value)
      })
    );
  };

  const popover = (
    <Popover id="popover">
      <Popover.Content>
        New wallet address that will receive your staked XPRT tokens
      </Popover.Content>
    </Popover>
  );
  return (
    <>
      <div className="form-field">
        <p className="label info">
          Destination Wallet Address
          <OverlayTrigger
            trigger={["hover", "focus"]}
            placement="bottom"
            overlay={popover}
          >
            <button className="icon-button info" type="button">
              <Icon viewClass="arrow-right" icon="info" />
            </button>
          </OverlayTrigger>
        </p>
        <InputText
          className="form-control"
          name="address"
          placeholder="Enter Destination address"
          required={true}
          type="text"
          autofocus={false}
          value={toAddress.value}
          onKeyPress={ValidateAlphaNumeric}
          onBlur={onBlur}
          error={toAddress.error}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default ToAddress;
