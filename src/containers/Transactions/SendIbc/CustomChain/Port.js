import React from 'react';
import InputText from "../../../../components/InputText";
import {useDispatch, useSelector} from "react-redux";
import {setTxIbcSendCustomPort} from "../../../../store/actions/transactions/sendIbc";
import {useTranslation} from "react-i18next";
import {ValidateAlphaNumeric} from "../../../../utils/validations";

const Port = () => {
    const {t} = useTranslation();
    const customPort = useSelector((state) => state.sendIbc.customPort);
    const dispatch = useDispatch();

    const onChange = (evt) => {
        dispatch(setTxIbcSendCustomPort({
            value: evt.target.value,
            error: {
                message: ''
            }
        }));
    };

    return (
        <>
            <div className="form-field">
                <p className="label info">{t("PORT")}</p>
                <InputText
                    className="form-control"
                    name="port"
                    type="text"
                    value={customPort.value}
                    required={true}
                    error={customPort.error}
                    onKeyPress={ValidateAlphaNumeric}
                    placeholder={t("ENTER_PORT")}
                    autofocus={false}
                    onChange={onChange}
                />
            </div>
        </>
    );
};


export default Port;
