import React, {useState} from 'react';
import {OverlayTrigger, Popover} from "react-bootstrap";
import Icon from "../../../components/Icon";
import InputText from "../../../components/InputText";
import {useDispatch, useSelector} from "react-redux";
import {setTxMemo} from "../../../store/actions/transactions/sendIbc";
import {useTranslation} from "react-i18next";
import {ValidateAlphaNumericSpaces, ValidateMemo} from "../../../utils/validations";

const Memo = () => {
    const {t} = useTranslation();
    const [memoStatus, setMemoStatus] = useState(false);
    const memo = useSelector((state) => state.sendIbc.memo);
    const dispatch = useDispatch();

    const handleMemoChange = () => {
        setMemoStatus(!memoStatus);
    };

    const popoverMemo = (
        <Popover id="popover-memo">
            <Popover.Content>
                {t("MEMO_NOTE")}
            </Popover.Content>
        </Popover>
    );

    const onChange = (evt) => {
        dispatch(setTxMemo({
            value: evt.target.value,
            error: ValidateMemo(evt.target.value)
        }));
    };

    const onBlur = (evt) => {
        dispatch(setTxMemo({
            value: evt.target.value,
            error: ValidateMemo(evt.target.value),
        }));
    };


    return (
        <>
            <div className="memo-dropdown-section">
                <p onClick={handleMemoChange} className="memo-dropdown"><span
                    className="text">{t("ADVANCED")} </span>
                {memoStatus ?
                    <Icon
                        viewClass="arrow-right"
                        icon="up-arrow"/>
                    :
                    <Icon
                        viewClass="arrow-right"
                        icon="down-arrow"/>}
                </p>
                <OverlayTrigger trigger={['hover', 'focus']}
                    placement="bottom"
                    overlay={popoverMemo}>
                    <button className="icon-button info" type="button"><Icon
                        viewClass="arrow-right"
                        icon="info"/></button>
                </OverlayTrigger>
            </div>

            <div className={`form-field memo-dropdown-section-body ${memoStatus ? 'show' : ''}`}>
                <p className="label info">{t("MEMO")}
                    <OverlayTrigger trigger={['hover', 'focus']} placement="bottom"
                        overlay={popoverMemo}>
                        <button className="icon-button info" type="button"><Icon
                            viewClass="arrow-right"
                            icon="info"/></button>
                    </OverlayTrigger>
                </p>
                <InputText
                    className="form-control"
                    name="memo"
                    type="text"
                    value={memo.value}
                    required={false}
                    error={memo.error}
                    onKeyPress={ValidateAlphaNumericSpaces}
                    onBlur={onBlur}
                    placeholder={t("ENTER_MEMO")}
                    autofocus={false}
                    maxLength={200}
                    onChange={onChange}
                />

            </div>
        </>
    );
};


export default Memo;
