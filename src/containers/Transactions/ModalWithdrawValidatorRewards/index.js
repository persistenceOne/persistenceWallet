import React from 'react';
import {Modal as ReactModal, OverlayTrigger, Popover} from "react-bootstrap";
import Icon from "../../../components/Icon";
import Memo from "./Memo";
import ButtonSubmit from "./ButtonSubmit";
import {useDispatch, useSelector} from "react-redux";
import {hideTxWithdrawValidatorRewardsModal} from "../../../store/actions/transactions/withdrawValidatorRewards";
import {showValidatorTxModal} from "../../../store/actions/validators";
import NumberView from "../../../components/NumberView";
import {formatNumber} from "../../../utils/scripts";
import {useTranslation} from "react-i18next";
import {
    setPreviousModalName,
    showTxWithDrawAddressModal
} from "../../../store/actions/transactions/setWithdrawAddress";
import {LOGIN_INFO} from "../../../constants/localStorage";
import ReactGA from "react-ga4";
import {DefaultChainInfo} from "../../../config";

const ModalWithdraw = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const show = useSelector((state) => state.withdrawValidatorRewards.modal);
    const rewards = useSelector((state) => state.validators.validatorRewards);
    const response = useSelector(state => state.common.error);
    const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));

    const handleClose = () => {
        dispatch(hideTxWithdrawValidatorRewardsModal());
    };

    const handlePrevious = () => {
        dispatch(showValidatorTxModal());
        dispatch(hideTxWithdrawValidatorRewardsModal());
    };

    const popoverSetupAddress = (
        <Popover id="popover-memo">
            <Popover.Content>
                {t("SETUP_ADDRESS_NOTE")}
            </Popover.Content>
        </Popover>
    );

    const setWithdrawAddressHandler = () => {
        ReactGA.event({
            category: `Setup Rewards Withdrawal Address`,
            action: `Clicked on Setup Rewards Withdrawal Address`
        });
        dispatch(setPreviousModalName({
            value: 'withdrawValidator',
            error: {
                message: ''
            }
        }));
        dispatch(hideTxWithdrawValidatorRewardsModal());
        dispatch(showTxWithDrawAddressModal());
    };

    return (
        <ReactModal
            animation={false}
            backdrop="static"
            className="modal-custom delegate-modal"
            centered={true}
            keyboard={false}
            show={show}
            onHide={handleClose}>
            <ReactModal.Header closeButton>
                <div className="previous-section txn-header">
                    <button className="button" onClick={() => handlePrevious()}>
                        <Icon
                            viewClass="arrow-right"
                            icon="left-arrow"/>
                    </button>
                </div>
                <h3 className="heading"> {t("CLAIM_STAKING_REWARDS")}
                </h3>
            </ReactModal.Header>
            <ReactModal.Body className="delegate-modal-body">
                <div className="form-field p-0">
                    <p className="label">{t("AVAILABLE")} ({DefaultChainInfo.currency.coinDenom})</p>
                    <div className="available-tokens">
                        <p className={rewards.value === 0 ? "empty info-data" : "info-data"}
                            title={rewards.value}>
                            <NumberView value={formatNumber(rewards.value)}/>
                        </p>
                    </div>
                </div>
                {loginInfo && loginInfo.loginMode !== "keplr"
                    ?
                    <Memo/>
                    : null
                }
                {response.error.message !== '' ?
                    <p className="form-error">{response.error.message}</p> : null}
                <ButtonSubmit/>
                <div className="buttons">
                    <p className="button-link"
                        onClick={() => setWithdrawAddressHandler()}>
                        {t("SET_WITHDRAW_ADDRESS")}
                    </p>
                    <OverlayTrigger trigger={['hover', 'focus']} placement="bottom"
                        overlay={popoverSetupAddress}>
                        <button className="icon-button info" type="button"><Icon
                            viewClass="arrow-right"
                            icon="info"/></button>
                    </OverlayTrigger>
                </div>
            </ReactModal.Body>
        </ReactModal>
    );
};


export default ModalWithdraw;
