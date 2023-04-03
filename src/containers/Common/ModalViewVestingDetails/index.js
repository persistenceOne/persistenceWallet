import {Modal, Table} from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import transactions from "../../../utils/transactions";
import {QueryClientImpl} from "cosmjs-types/cosmos/auth/v1beta1/query";
import * as vesting_1 from "cosmjs-types/cosmos/vesting/v1beta1/vesting";
import {useTranslation} from "react-i18next";
import * as Sentry from "@sentry/react";
import {LOGIN_INFO} from "../../../constants/localStorage";
import {localTime} from "../../../utils/scripts";
import {tokenValueConversion} from "../../../utils/helper";

const ModalViewVestingDetails = () => {
    const {t} = useTranslation();
    const [show, setShow] = useState(false);
    const [showContinuesVesting, setShowContinuesVesting] = useState(false);
    const [showPeriodicVesting, setShowPeriodicVesting] = useState(false);
    const [showDelayedVesting, setShowDelayedVesting] = useState(false);
    const [response, setResponse] = useState({});
    const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));
    const handleClose = () => {
        setShow(false);
    };
    const handleModal = () => {
        setShow(true);
    };

    useEffect(() => {
        const fetchAccount = async () => {
            const rpcClient = await transactions.RpcClient();
            const AuthQueryService = new QueryClientImpl(rpcClient);
            await AuthQueryService.Account({
                address: loginInfo && loginInfo.address,
            }).then(accountResponse => {
                if (accountResponse.account.typeUrl === "/cosmos.vesting.v1beta1.PeriodicVestingAccount") {
                    let periodicVestingAccountResponse = vesting_1.PeriodicVestingAccount.decode(accountResponse.account.value);
                    setShowPeriodicVesting(true);
                    setResponse(periodicVestingAccountResponse);
                } else if (accountResponse.account.typeUrl === "/cosmos.vesting.v1beta1.DelayedVestingAccount") {
                    let delayedVestingAccountResponse = vesting_1.DelayedVestingAccount.decode(accountResponse.account.value);
                    setShowDelayedVesting(true);
                    setResponse(delayedVestingAccountResponse);
                } else if (accountResponse.account.typeUrl === "/cosmos.vesting.v1beta1.ContinuousVestingAccount") {
                    let continuousVestingAccountResponse = vesting_1.ContinuousVestingAccount.decode(accountResponse.account.value);
                    setShowContinuesVesting(true);
                    setResponse(continuousVestingAccountResponse);
                }
            }).catch(error => {
                Sentry.captureException(error.response
                    ? error.response.data.message
                    : error.message);
                console.log(error.response
                    ? error.response.data.message
                    : error.message);
            });
        };
        fetchAccount();
    }, []);

    return (
        <>
            <Modal
                animation={false}
                centered={true}
                show={show}
                backdrop="static"
                size="lg"
                className="modal-custom faq-modal"
                onHide={handleClose}>
                <Modal.Header className="result-header" closeButton>
                    <h3 className="heading">
                        {t("VESTING_SCHEDULE")}
                    </h3>
                </Modal.Header>
                <Modal.Body className="faq-modal-body">
                    <ul className="modal-list-data">
                        {showContinuesVesting ?
                            response.baseVestingAccount !== undefined ?
                                <Table borderless hover>
                                    <thead>
                                        <tr>
                                            <th>{t("UNLOCKING_TOKENS")}</th>
                                            <th>{t("FROM_DATE")}</th>
                                            <th>{t("TO_DATE")}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{tokenValueConversion(parseInt(response.baseVestingAccount.originalVesting.length && response.baseVestingAccount.originalVesting[0].amount))}</td>
                                            <td>
                                                {localTime(parseInt(response.startTime.low) * 1000)}
                                            </td>
                                            <td>
                                                {localTime((response.baseVestingAccount.endTime.low) * 1000)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                                : ""

                            : ""
                        }
                        {showPeriodicVesting ?
                            <>
                                <p>Your vesting schedule is as follows</p>
                                {response.baseVestingAccount ?
                                    <>
                                        <p>Total vesting
                                            tokens {tokenValueConversion(parseInt(response.baseVestingAccount.originalVesting.length && response.baseVestingAccount.originalVesting[0].amount))} at
                                            Date {localTime(parseInt(response.startTime.low) * 1000)} </p>
                                        <Table borderless>
                                            <thead>
                                                <tr>
                                                    <th>{t("UNLOCKING_TOKENS")}</th>
                                                    <th>{t("DATE")}</th>
                                                </tr>
                                            </thead>
                                            {
                                                response.vestingPeriods.length ?
                                                    response.vestingPeriods.map((period, index) => {
                                                        let vestingPeriod = parseInt(response.startTime.low);
                                                        for (let i = 0; i <= index; i++) {
                                                            vestingPeriod = vestingPeriod + parseInt(response.vestingPeriods[i].length);
                                                        }
                                                        return (
                                                            <tbody key={index}>
                                                                <tr>
                                                                    <td>{tokenValueConversion(period.amount[0].amount)}</td>
                                                                    <td>
                                                                        {localTime(vestingPeriod * 1000)}
                                                                    </td>
                                                                </tr>
                                                            </tbody>

                                                        );
                                                    })
                                                    : ""
                                            }
                                        </Table>
                                    </>
                                    : ""
                                }
                            </>
                            : ""
                        }
                        {showDelayedVesting ?
                            response.baseVestingAccount !== undefined ?
                                <Table borderless>
                                    <thead>
                                        <tr>
                                            <th>{t("UNLOCKING_TOKENS")}</th>
                                            <th>{t("DATE")}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{tokenValueConversion(parseInt(response.baseVestingAccount.originalVesting[0].amount))}</td>
                                            <td>
                                                {localTime((response.baseVestingAccount.endTime.low) * 1000)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                                : ""

                            : ""
                        }
                    </ul>

                </Modal.Body>
            </Modal>
            <span className="view-button" onClick={handleModal} title="View Vesting Schedule">{t("VIEW")}</span>
        </>

    );
};


const stateToProps = (state) => {
    return {
        list: state.unbond.list,
    };
};


export default connect(stateToProps)(ModalViewVestingDetails);

