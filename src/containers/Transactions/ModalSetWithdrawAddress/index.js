import {Modal as ReactModal} from 'react-bootstrap';
import React, {useEffect} from 'react';
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {hideTxWithDrawAddressModal} from "../../../store/actions/transactions/setWithdrawAddress";
import RevisedAddress from "./RevisedAddress";
import Memo from "./Memo";
import NumberView from "../../../components/NumberView";
import {formatNumber} from "../../../utils/scripts";
import ButtonNext from "./ButtonNext";
import {fetchWithdrawAddress} from "../../../store/actions/withdrawAddress";
import Icon from "../../../components/Icon";
import {showTxWithDrawTotalModal} from "../../../store/actions/transactions/withdrawTotalRewards";
import {showTxWithdrawValidatorRewardsModal} from "../../../store/actions/transactions/withdrawValidatorRewards";
import {LOGIN_INFO} from "../../../constants/localStorage";
import {DefaultChainInfo} from "../../../config";

const ModalSetWithdrawAddress = () => {
    const {t} = useTranslation();
    const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));
    const dispatch = useDispatch();

    const previousModalName = useSelector((state) => state.setWithdrawAddress.previousModalName);
    const show = useSelector((state) => state.setWithdrawAddress.modal);
    const withdrawAddress = useSelector((state) => state.withdrawAddress.withdrawAddress);
    const delegations = useSelector((state) => state.delegations.count);
    const error = useSelector(state => state.common.error);

    useEffect(() => {
        dispatch(fetchWithdrawAddress(loginInfo && loginInfo.address));
    }, []);

    const handleClose = () => {
        dispatch(hideTxWithDrawAddressModal());
    };

    const handlePrevious = () => {
        dispatch(hideTxWithDrawAddressModal());
        if (previousModalName.value === "withdrawTotal") {
            dispatch(showTxWithDrawTotalModal());
        } else {
            dispatch(showTxWithdrawValidatorRewardsModal());
        }
    };

    return (
        <ReactModal
            animation={false}
            backdrop="static"
            className="modal-custom claim-rewards-modal set-address"
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
                <h3 className="heading">{t("SETUP_WITHDRAWAL_ADDRESS")}</h3>
            </ReactModal.Header>

            <ReactModal.Body className="rewards-modal-body">
                <div className="form-field">
                    <p className="label">{t("CURRENT_ADDRESS")}</p>
                    <div className="available-tokens">
                        <p className="tokens">{withdrawAddress}</p>
                    </div>
                </div>
                <RevisedAddress/>
                <div className="form-field p-0">
                    <p className="label"> {t("DELEGATIONS")}</p>
                    <p className={delegations === 0 ? "empty info-data" : "info-data"}>
                        <NumberView value={formatNumber(delegations)}/>{DefaultChainInfo.currency.coinDenom}</p>
                </div>
                {loginInfo && loginInfo.loginMode !== 'keplr'
                    ?
                    <Memo/>
                    : null
                }
                {error !== '' ?
                    <p className="form-error">{error.error.message}</p> : null}
                <ButtonNext/>
            </ReactModal.Body>
        </ReactModal>
    );
};

export default ModalSetWithdrawAddress;
