import { Modal as ReactModal, Spinner } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  hideKeyStoreResultModal,
  keyStoreLogin,
  showKeyStoreModal
} from "../../../../store/actions/signIn/keyStore";
import Icon from "../../../../components/Icon";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { QueryClientImpl } from "cosmjs-types/cosmos/bank/v1beta1/query";
import { QueryClientImpl as StakingQueryClientImpl } from "cosmjs-types/cosmos/staking/v1beta1/query";
import { DefaultChainInfo } from "../../../../config";
import { stringToNumber } from "../../../../utils/scripts";
import { getAccount, tokenValueConversion } from "../../../../utils/helper";
import * as Sentry from "@sentry/browser";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { createProtobufRpcClient, QueryClient } from "@cosmjs/stargate";
import vestingAccount from "../../../../utils/vestingAmount";
import transactions from "../../../../utils/transactions";
import Lodash from "lodash";
const tendermintRPCURL = process.env.NEXT_PUBLIC_TENDERMINT_RPC_ENDPOINT;

const fetchBalance = async (address) => {
  try {
    const vestingAmountData = await getAccount(address);
    let transferableAmount = 0;
    if (vestingAmountData !== undefined) {
      const tendermintClient = await Tendermint34Client.connect(
        tendermintRPCURL
      );
      const queryClient = new QueryClient(tendermintClient);
      const rpcClient = createProtobufRpcClient(queryClient);
      const stakingQueryService = new QueryClientImpl(rpcClient);
      const response = await stakingQueryService.AllBalances({
        address: address
      });
      for (let item of response.balances) {
        if (item.denom === DefaultChainInfo.currency.coinMinimalDenom) {
          item.ibcBalance = false;
          const balance = tokenValueConversion(stringToNumber(item.amount));
          const vestingBalance =
            await vestingAccount.getTransferableVestingAmount(address, balance);
          transferableAmount = vestingBalance[1];
        } else {
          transferableAmount = 0;
        }
      }
    }
    return transferableAmount;
  } catch (error) {
    Sentry.captureException(
      error.response ? error.response.data.message : error.message
    );
    console.log(error, "error");
    return 0;
  }
};

export const fetchDelegationsCount = async (address) => {
  try {
    const rpcClient = await transactions.RpcClient();
    const stakingQueryService = new StakingQueryClientImpl(rpcClient);
    const delegationsResponse = await stakingQueryService.DelegatorDelegations({
      delegatorAddr: address
    });
    if (delegationsResponse.delegationResponses.length) {
      let totalDelegationsCount = Lodash.sumBy(
        delegationsResponse.delegationResponses,
        (delegation) => {
          return stringToNumber(delegation.balance.amount);
        }
      );
      return tokenValueConversion(totalDelegationsCount);
    } else {
      return 0;
    }
  } catch (error) {
    Sentry.captureException(
      error.response ? error.response.data.message : error.message
    );
    console.log(error.message);
    return 0;
  }
};

export const fetchUnbondDelegations = async (address) => {
  try {
    const rpcClient = await transactions.RpcClient();
    const stakingQueryService = new StakingQueryClientImpl(rpcClient);
    const unbondingDelegationsResponse =
      await stakingQueryService.DelegatorUnbondingDelegations({
        delegatorAddr: address
      });
    if (unbondingDelegationsResponse.unbondingResponses.length) {
      const totalUnbond = Lodash.sumBy(
        unbondingDelegationsResponse.unbondingResponses,
        (item) => {
          if (item.entries.length) {
            return Lodash.sumBy(item.entries, (entry) => {
              return parseInt(entry["balance"]);
            });
          }
        }
      );
      return tokenValueConversion(totalUnbond);
    } else {
      return 0;
    }
  } catch (error) {
    Sentry.captureException(
      error.response ? error.response.data.message : error.message
    );
    console.log(error.message);
    return 0;
  }
};
const ModalAddress = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const show = useSelector((state) => state.signInKeyStore.keyStoreResultModal);
  const response = useSelector((state) => state.signInKeyStore.response.value);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [coin118Balance, setCoin118Balance] = useState(0);
  const [coin750Balance, setCoin750Balance] = useState(0);
  const [coin118Delegations, setCoin118Delegations] = useState(0);
  const [coin750Delegations, setCoin750Delegations] = useState(0);
  const [coin118DUnbonding, setCoin118DUnbonding] = useState(0);
  const [coin750DUnbonding, setCoin750DUnbonding] = useState(0);
  const dispatch = useDispatch();

  useEffect(async () => {
    setBalanceLoading(true);
    const [
      balance118,
      balance750,
      delegations118,
      delegations750,
      unBondings118,
      unBondings750
    ] = await Promise.all([
      fetchBalance(response?.coin118Data?.address),
      fetchBalance(response?.coin750Data?.address),
      fetchDelegationsCount(response?.coin118Data?.address),
      fetchDelegationsCount(response?.coin750Data?.address),
      fetchUnbondDelegations(response?.coin118Data?.address),
      fetchUnbondDelegations(response?.coin750Data?.address)
    ]);
    setCoin118Balance(balance118);
    setCoin750Balance(balance750);
    setCoin118Delegations(delegations118);
    setCoin750Delegations(delegations750);
    setCoin118DUnbonding(unBondings118);
    setCoin750DUnbonding(unBondings750);
    setBalanceLoading(false);
  }, [response]);

  const handleClose = () => {
    dispatch(hideKeyStoreResultModal());
  };

  const handleLogin = () => {
    dispatch(
      keyStoreLogin(
        history,
        response.coin750Data.address,
        response.coin118Data,
        response.coin750Data,
        "750"
      )
    );
  };

  const keyStorePrevious = () => {
    dispatch(hideKeyStoreResultModal());
    dispatch(showKeyStoreModal());
  };

  return (
    <ReactModal
      animation={false}
      backdrop="static"
      className="modal-custom"
      centered={true}
      keyboard={false}
      show={show}
      onHide={handleClose}
    >
      <ReactModal.Header closeButton>
        <div className="previous-section">
          <button
            className="button"
            onClick={() => keyStorePrevious("advancedForm")}
          >
            <Icon viewClass="arrow-right" icon="left-arrow" />
          </button>
        </div>
        <h3 className="heading">{t("LOGIN_WITH_KEYSTORE")}</h3>
      </ReactModal.Header>

      <ReactModal.Body className="create-wallet-body import-wallet-body">
        <p className="note">
          As part of the Persistence v3 chain upgrade, the default coin-type was
          changed from 750 to 118, which means a new address (coin-type 118) was
          generated based on your KeyStore.
        </p>

        <div className="form-field radio">
          <div className="d-flex mb-3">
            <div>
              <p className="mnemonic-result text-left pt-0 pb-2">
                <span className="label">{t("NEW_ADDRESS")}: </span>
                {response?.coin118Data?.address}
              </p>
              <p className="mnemonic-result text-left pt-0 pb-2">
                <span className="label">{t("WALLET_PATH")}: </span>
                {response?.coin118Data?.walletPath}
              </p>
              <p className="mnemonic-result text-left pt-0 pb-2">
                <span className="label">{t("Coin-type")}: </span>118{" "}
              </p>
              <p className="mnemonic-result text-left p-0 d-flex align-items-center">
                <span className="label m-0">{t("Balance")}:&nbsp;</span>
                {balanceLoading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    // className="ml-2"
                  />
                ) : (
                  <>
                    {coin118Balance + coin118Delegations + coin118DUnbonding}{" "}
                    XPRT
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="form-field radio">
          <div className="d-flex mb-3">
            <div>
              <p className="mnemonic-result text-left pt-0 pb-2">
                <span className="label">{t("ORIGINAL_ADDRESS")} : </span>
                {response?.coin750Data?.address}
              </p>
              <p className="mnemonic-result text-left pt-0 pb-2">
                <span className="label">{t("WALLET_PATH")}: </span>
                {response?.coin750Data?.walletPath}
              </p>
              <p className="mnemonic-result text-left pt-0 pb-2">
                <span className="label">{t("Coin-type")}: </span>750{" "}
              </p>
              <p className="mnemonic-result text-left p-0 d-flex align-items-center">
                <span className="label m-0">{t("Balance")}:&nbsp;</span>
                {balanceLoading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    // className="ml-2"
                  />
                ) : (
                  <>
                    {coin750Balance + coin750Delegations + coin750DUnbonding}{" "}
                    XPRT
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
        <p className="note">
          <b>Note:</b> Fungibility of assets is NOT impacted and both coin-types
          are still supported. Each address can hold assets, and assets can be
          transferred between account types. Read all details&nbsp;
          <a
            href="https://blog.persistence.one/2022/07/14/coin-type-migration-from-750-to-118-for-persistence-core-1-chain-xprt/"
            target="_blank"
            className="tx-hash"
            rel="noopener noreferrer"
          >
            here
          </a>
        </p>
        <div className="buttons">
          <button className="button button-primary" onClick={handleLogin}>
            {t("LOGIN")}
          </button>
        </div>
      </ReactModal.Body>
    </ReactModal>
  );
};

export default ModalAddress;
