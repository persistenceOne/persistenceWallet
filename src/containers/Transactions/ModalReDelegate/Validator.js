import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import helper from "../../../utils/helper";
import {setTxReDelegateAddress} from "../../../store/actions/transactions/redelegate";

const Validator = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const toAddress = useSelector((state) => state.redelegate.toAddress);
    const validators = useSelector((state) => state.validators.validators);
    const validator = useSelector((state) => state.validators.validator.value);
    let activeValidatorsList;
    let inActiveValidatorsList;
    if (validators) {
        activeValidatorsList = (validators.filter(item => helper.isActive(item)));
        inActiveValidatorsList = (validators.filter(item => !helper.isActive(item)));
    }

    const onChangeSelect = (evt) => {
        dispatch(setTxReDelegateAddress({
            value: evt.target.value,
            error: new Error(''),
        }));

    };

    const moniker = validator.description && validator.description.moniker;

    return (
        <div className="form-field">
            <p className="label">Validator</p>
            <div className="form-control-section">
                <Select value={toAddress.value} className="validators-list-selection"
                    onChange={onChangeSelect} displayEmpty>
                    <MenuItem value="" className="validator-item" key={0}>
                        <em>{t("SELECT_VALIDATOR")}</em>
                    </MenuItem>
                    {
                        activeValidatorsList.map((validator, index) => {
                            if (validator.description.moniker !== moniker) {
                                return (
                                    <MenuItem
                                        key={index + 1}
                                        className="validator-item"
                                        value={validator.operatorAddress}>
                                        <span>{validator.description.moniker}</span>
                                        <span className="state active">{t("ACTIVE")} </span>
                                    </MenuItem>
                                );
                            }
                        })
                    }
                    {
                        inActiveValidatorsList.map((validator, index) => {
                            if (validator.description.moniker !== moniker) {
                                return (
                                    <MenuItem
                                        key={index + 1}
                                        className="validator-item"
                                        value={validator.operatorAddress}>
                                        <span>{validator.description.moniker}</span>
                                        <span className="state inactive">{t("IN_ACTIVE")}</span>
                                    </MenuItem>
                                );
                            }
                        })
                    }
                </Select>
            </div>
        </div>
    );
};


export default Validator;
