import React, {useState} from "react";
import {connect} from 'react-redux';
import {fetchDelegationsCount} from "../store/actions/delegations";
import {fetchBalance, fetchTransferableVestingAmount} from "../store/actions/balance";
import {fetchRewards, fetchTotalRewards} from "../store/actions/rewards";
import {fetchUnbondDelegations} from "../store/actions/unbond";
import {fetchTokenPrice} from "../store/actions/tokenPrice";
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import {fetchReceiveTransactions, fetchTransactions} from "../store/actions/transactionHistory";
import {LOGIN_INFO} from "../constants/localStorage";
import {updateFee} from "../utils/helper";
import ReactGA from "react-ga4";

const InfoRefresh = (props) => {
    const [inProgress, setInProgress] = useState(false);
    const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));

    const handleRefresh = async () => {
        ReactGA.event({
            category: `Refresh`,
            action: `Clicked on Refresh`
        });
        setInProgress(true);
        setTimeout(() => {
            setInProgress(false);
        }, 1000);
        await Promise.all([
            props.fetchDelegationsCount(loginInfo.address),
            props.fetchBalance(loginInfo.address),
            props.fetchRewards(loginInfo.address),
            props.fetchTotalRewards(loginInfo.address),
            props.fetchUnbondDelegations(loginInfo.address),
            props.fetchTokenPrice(),
            props.fetchTransactions(loginInfo.address, 5, 1),
            props.fetchReceiveTransactions(loginInfo.address, 5, 1),
            props.fetchTransferableVestingAmount(loginInfo.address),
            updateFee(loginInfo.address),
        ]);
    };
    return (
        <IconButton
            className={inProgress ? 'refresh-button refresh-start' : 'refresh-button'}
            onClick={handleRefresh} title="Refresh">
            <RefreshIcon/>
        </IconButton>
    );
};

const stateToProps = (state) => {
    return {
        delegations: state.delegations.count,
        balance: state.balance.amount,
        rewards: state.rewards.rewards,
        unbond: state.unbond.unbond,
        tokenPrice: state.tokenPrice.tokenPrice
    };
};

const actionsToProps = {
    fetchDelegationsCount,
    fetchBalance,
    fetchRewards,
    fetchUnbondDelegations,
    fetchTokenPrice,
    fetchTransactions,
    fetchReceiveTransactions,
    fetchTransferableVestingAmount,
    fetchTotalRewards
};

export default connect(stateToProps, actionsToProps)(InfoRefresh);

