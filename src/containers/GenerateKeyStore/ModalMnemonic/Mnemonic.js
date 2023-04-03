import React from 'react';
import {Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {setKeyStoreMnemonic} from "../../../store/actions/generateKeyStore";
import {useTranslation} from "react-i18next";
import {ValidateMnemonic, ValidateStringSpaces} from "../../../utils/validations";

const Mnemonic = () => {
    const {t} = useTranslation();
    const mnemonic = useSelector((state) => state.generateKeyStore.mnemonic);
    const dispatch = useDispatch();

    const onChange = (evt) => {
        dispatch(setKeyStoreMnemonic({
            value: evt.target.value,
            error: ValidateMnemonic(evt.target.value)
        }));
    };

    return (
        <div className="form-field">
            <p className="label">{t("ENTER_MNEMONIC")}</p>
            <div className="form-control-section flex-fill">
                <Form.Control as="textarea" rows={3} name="mnemonic"
                    placeholder={t("SEED_PHRASE")}
                    onKeyPress={ValidateStringSpaces}
                    onChange={onChange}
                    required={true}/>
                <p className="input-error">{mnemonic.error.message}</p>
            </div>
        </div>
    );
};


export default Mnemonic;
