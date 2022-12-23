import {Modal} from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from "react-redux";
import helper, {tokenValueConversion, truncateToFixedDecimalPlaces} from "../../../utils/helper";
import {useTranslation} from "react-i18next";
import {DefaultChainInfo, PstakeInfo} from "../../../config";
import {decimalize, stringToNumber} from "../../../utils/scripts";
import ButtonMigrate from "./ButtonSubmit";
import {LOGIN_INFO} from "../../../constants/localStorage";
import {
    hideTxMigrateModal, setTxAmountError, setTxButtonStatus, setTxMigrateTokens,
    showTxMigrateModal
} from "../../../store/actions/transactions/migrateAssets";
import {setTxSendAddress} from "../../../store/actions/transactions/migrateAssets";
import {validateAddress} from "../../../utils/validations";

const ModalMigrateBalance = () => {
    const tokenList = useSelector((state) => state.balance.tokenList);
    const {modal, toAddress, migrationTokenList, buttonStatus} = useSelector((state) => state.migrateAssets);
    const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));
    const [editMode, setEditMode] = useState(false);
    const [localMigrationTokenList, setLocalMigrationTokenList] = useState([]);


    useEffect(() => {
        dispatch(setTxSendAddress({
            value: loginInfo && loginInfo?.coin118Response?.address,
            error: {
                message: ''
            }
        }));
    }, []);

    useEffect(() => {
        setLocalMigrationTokenList(migrationTokenList.list);
    }, [migrationTokenList]);

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

    const handleAddressEdit = () => {
        setEditMode(!editMode);
    };

    const dispatch = useDispatch();
    const {t} = useTranslation();
    const handleClose = () => {
        dispatch(hideTxMigrateModal());
    };
    const handleModal =  () => {
        dispatch(showTxMigrateModal());
    };

    const onChangeAmount =  (denom, amount, e) => {
        let rex = /^\d*\.?\d{0,6}$/;
        if (rex.test(e.target.value) ) {
            let balance = migrationTokenList.list;
            let buttonStatusList = buttonStatus.length === 0 ? new Array(migrationTokenList.list.length).fill(false) : buttonStatus;
            let status;
            status = e.target.value === '' || stringToNumber(e.target.value) <= 0;
            let amountCheck;
            amountCheck = stringToNumber(amount) < stringToNumber(e.target.value);
            balance.forEach((item, index) => {
                if (item.denom === denom) {
                    buttonStatusList[index] = status || amountCheck;
                    item.amount = e.target.value;
                }
            });
            dispatch(setTxAmountError(amountCheck));
            dispatch(setTxButtonStatus(buttonStatusList));
            dispatch(setTxMigrateTokens(balance));
        } else{
            return false;
        }
    };

    const handleMaxAmount =  (denom, amount) => {
        let balance = migrationTokenList.list;
        let buttonStatusList = new Array(migrationTokenList.list.length).fill(false);
        balance.forEach((item) => {
            if (item.denom === denom){
                item.amount = amount;
            }
        });
        dispatch(setTxButtonStatus(buttonStatusList));
        dispatch(setTxMigrateTokens(balance));
    };

    return (
        <>
            <Modal
                animation={false}
                centered={true}
                show={modal}
                backdrop="static"
                size="lg"
                className="modal-custom list-modal migrate-modal"
                onHide={handleClose}>
                <Modal.Header className="result-header" closeButton>
                    <h3 className="heading">
                        {t("MIGRATE_TOKENS")}
                    </h3>
                </Modal.Header>
                <Modal.Body className="list-modal-body">
                    <p className="list-item">Migrate all your transferable assets from your 750 coin-type address to
                        your new 118 coin-type address in one transaction.</p>
                    <p className="list-item">Note that staked, vesting, and unbonding tokens, as well as unclaimed
                        staking rewards are not transferable yet.</p>
                    <p className="list-item"> The following assets will be transferred</p>
                    {localMigrationTokenList.length ?
                        localMigrationTokenList.map((item, index) => {
                            return(
                                <div className="token-list" key={index}>
                                    <div className="left">
                                        <p className="label"><span>
                                            {item.denom === DefaultChainInfo.currency.coinMinimalDenom ?
                                                helper.denomChange(item.denom) :
                                                <span>
                                                    {
                                                        helper.denomChange(tokenList[index]?.denomTrace?.baseDenom)
                                                    }
                                                    <span className="small">&nbsp;(IBC Token)</span>
                                                </span>
                                            }
                                        </span></p>
                                        <p className="input-label" onClick={()=>{handleMaxAmount(item.denom, tokenList[index]?.denom === PstakeInfo.coinMinimalDenom ?
                                            decimalize(tokenList[index]?.amount)
                                            :
                                            tokenValueConversion(tokenList[index].amount)
                                        );}}>
                                            <span>
                                                {tokenList[index]?.denom === PstakeInfo.coinMinimalDenom ?
                                                    truncateToFixedDecimalPlaces(decimalize(tokenList[index]?.amount))
                                                    :
                                                    truncateToFixedDecimalPlaces(tokenValueConversion(tokenList[index]?.amount))
                                                }
                                            </span>
                                        </p>
                                    </div>
                                    <div className="amount-container">
                                        <div className="input-container">
                                            <input
                                                type="text"
                                                placeholder="amount"
                                                value={item.amount}
                                                onChange={(e)=>{onChangeAmount(item.denom, tokenList[index]?.denom === PstakeInfo.coinMinimalDenom ?
                                                    decimalize(tokenList[index]?.amount)
                                                    :
                                                    tokenValueConversion(tokenList[index].amount), e);}}
                                            />
                                        </div>
                                    </div>

                                </div>
                            );
                        }) : null
                    }
                    <p className="list-item">to the following address: (please verify this is your own 118 coin-type address)</p>
                    <div className="mb-4">
                        <p className={`${editMode ? "edit" : ""} list-item address-container mb-1`}>
                            <input
                                type="text"
                                placeholder="Address"
                                value={toAddress.value}
                                autoFocus={editMode}
                                onChange={onChange}
                                onBlur={onBlur}
                            />
                            <button title="Edit address" className="edit-button">
                                {!editMode ?
                                    <span onClick={handleAddressEdit}>
                                Edit
                                    </span> :
                                    <span onClick={handleAddressEdit}>
                                Enter
                                    </span>
                                }
                            </button>
                        </p>
                        <p className="input-error">{toAddress.error.message}</p>
                    </div>
                    <ButtonMigrate/>
                </Modal.Body>
            </Modal>
            <div role="button" className="dropdown-item" onClick={handleModal}>
                <span className='migrate'>Migrate Tokens from 750 to 118 </span>
            </div>
        </>

    );
};


const stateToProps = (state) => {
    return {
        list: state.balance.list,
    };
};


export default connect(stateToProps)(ModalMigrateBalance);

