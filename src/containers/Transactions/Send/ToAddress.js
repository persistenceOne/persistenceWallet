import React from 'react';
import {OverlayTrigger, Popover} from "react-bootstrap";
import Icon from "../../../components/Icon";
import InputText from "../../../components/InputText";
import {useDispatch, useSelector} from "react-redux";
import {setTxSendAddress} from "../../../store/actions/transactions/send";
import {useTranslation} from "react-i18next";
import {validateAddress, ValidateAlphaNumeric} from "../../../utils/validations";

const ToAddress = () => {
    const {t} = useTranslation();
    const toAddress = useSelector((state) => state.send.toAddress);
    const dispatch = useDispatch();
    const onChange = (evt) => {
        dispatch(setTxSendAddress({
            value: evt.target.value.toString(),
            error: {
                message: ''
            }
        }));
    };

    const onBlur = (evt) => {
        dispatch(setTxSendAddress({
            value: evt.target.value.toString(),
            error: validateAddress(evt.target.value),
        }));
    };

    const popover = (
        <Popover id="popover">
            <Popover.Content>
                {t("RECIPIENT_ADDRESS_EXAMPLE")}
            </Popover.Content>
        </Popover>
    );
    return (
        <>
            <div className="form-field">
                <p className="label info">{t("RECIPIENT_ADDRESS")}
                    <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popover}>
                        <button className="icon-button info" type="button"><Icon
                            viewClass="arrow-right"
                            icon="info"/></button>
                    </OverlayTrigger></p>
                <InputText
                    className="form-control"
                    name="address"
                    placeholder="Enter Recipient's address"
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
