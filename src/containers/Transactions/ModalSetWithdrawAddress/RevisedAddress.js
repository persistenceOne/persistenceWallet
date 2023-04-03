import React from 'react';
import InputText from "../../../components/InputText";
import {useDispatch, useSelector} from "react-redux";
import {setTxWithDrawAddress} from "../../../store/actions/transactions/setWithdrawAddress";
import {useTranslation} from "react-i18next";
import {validateAddress, ValidateAlphaNumeric} from "../../../utils/validations";

const RevisedAddress = () => {
    const {t} = useTranslation();
    const revisedAddress = useSelector((state) => state.setWithdrawAddress.revisedAddress);
    const dispatch = useDispatch();

    const onChange = (evt) => {
        dispatch(setTxWithDrawAddress({
            value: evt.target.value,
            error: {
                message: ''
            }
        }));
    };

    const onBlur = (evt) => {
        dispatch(setTxWithDrawAddress({
            value: evt.target.value,
            error: validateAddress(evt.target.value),
        }));
    };


    return (
        <>
            <div className="form-field">
                <p className="label info">{t("REVISED_ADDRESS")}</p>
                <InputText
                    className="form-control"
                    name="withdrawalAddress"
                    type="text"
                    value={revisedAddress.value}
                    required={true}
                    error={revisedAddress.error}
                    onKeyPress={ValidateAlphaNumeric}
                    onBlur={onBlur}
                    placeholder={t("ENTER_WITHDRAW_ADDRESS")}
                    autofocus={false}
                    onChange={onChange}
                />
            </div>
        </>
    );
};


export default RevisedAddress;
