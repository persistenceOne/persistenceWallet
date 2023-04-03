import React from 'react';
import InputText from "../../../../components/InputText";
import {useDispatch, useSelector} from "react-redux";
import {setTxIbcSendCustomChannel} from "../../../../store/actions/transactions/sendIbc";
import {useTranslation} from "react-i18next";

const Channel = () => {
    const {t} = useTranslation();
    const customChannel = useSelector((state) => state.sendIbc.customChannel);
    const dispatch = useDispatch();

    const onChange = (evt) => {
        dispatch(setTxIbcSendCustomChannel({
            value: evt.target.value,
            error: {
                message: ''
            }
        }));
    };

    return (
        <>
            <div className="form-field">
                <p className="label info">{t("CHANNEL")}</p>
                <InputText
                    className="form-control"
                    name="channel"
                    type="text"
                    value={customChannel.value}
                    required={true}
                    error={customChannel.error}
                    placeholder={t("ENTER_CHANNEL")}
                    autofocus={false}
                    onChange={onChange}
                />
            </div>
        </>
    );
};


export default Channel;
