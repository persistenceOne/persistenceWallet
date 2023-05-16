import { setTxIbcSendToken } from "../../../store/actions/transactions/sendIbc";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useTranslation } from "react-i18next";
import {
  decimalize,
  stringToNumber,
  stringTruncate
} from "../../../utils/scripts";
import { denomChange, tokenValueConversion } from "../../../utils/helper";
import { DefaultChainInfo, PstakeInfo, stkATOMInfo } from "../../../config";

const Tokens = () => {
  const { t } = useTranslation();
  const tokenList = useSelector((state) => state.balance.tokenList);
  const transferableAmount = useSelector(
    (state) => state.balance.transferableAmount
  );
  const chainInfo = useSelector((state) => state.sendIbc.chainInfo.value);
  const disable = chainInfo.chainName === "";
  const dispatch = useDispatch();
  let tokenData = [];

  useEffect(() => {
    const initialObject = {
      tokenDenom: DefaultChainInfo.currency.coinMinimalDenom,
      token: DefaultChainInfo.currency.coinMinimalDenom,
      transferableAmount: transferableAmount
    };
    tokenData.push(initialObject);
    dispatch(
      setTxIbcSendToken({
        value: tokenData[0]
      })
    );
  }, []);

  const onTokenChangeSelect = (evt) => {
    dispatch(
      setTxIbcSendToken({
        value: []
      })
    );
    tokenData = [];
    const tokenDataObject = {};
    tokenDataObject.token = evt.target.value;
    if (evt.target.value === DefaultChainInfo.currency.coinMinimalDenom) {
      tokenDataObject.tokenDenom = evt.target.value;
      tokenDataObject.transferableAmount = transferableAmount;
    } else {
      tokenList.forEach((item) => {
        if (evt.target.value === item.denom) {
          tokenDataObject.tokenDenom = evt.target.value;
          if (item.denom === PstakeInfo.coinMinimalDenom) {
            tokenDataObject.transferableAmount = decimalize(
              item.amount,
              PstakeInfo.coinDecimals
            );
          } else {
            tokenDataObject.transferableAmount = tokenValueConversion(
              stringToNumber(item.amount)
            );
          }
          tokenDataObject.tokenItem = item;
        }
      });
    }
    tokenData.push(tokenDataObject);
    dispatch(
      setTxIbcSendToken({
        value: tokenData[0]
      })
    );
  };

  return (
    <div className="form-field">
      <p className="label">{t("TOKEN")}</p>
      <div className="form-control-section flex-fill">
        <Select
          defaultValue={DefaultChainInfo.currency.coinMinimalDenom}
          className="validators-list-selection"
          onChange={onTokenChangeSelect}
          displayEmpty
          disabled={disable}
        >
          {tokenList.map((item, index) => {
            if (
              (item.denom === DefaultChainInfo.currency.coinMinimalDenom &&
                !item.ibcBalance) ||
              item.denom === stkATOMInfo.coinMinimalDenom
            ) {
              return (
                <MenuItem key={index + 1} className="" value={item.denom}>
                  <>
                    <img
                      src={item.tokenImage}
                      alt={"logo"}
                      width={20}
                      className="mr-2"
                    />
                    {denomChange(item.denom) === "Unknown"
                      ? stringTruncate(item.denom, 5)
                      : denomChange(item.denom)}
                  </>
                </MenuItem>
              );
            } else {
              return (
                <MenuItem key={index + 1} className="" value={item.denom}>
                  <img
                    src={item.tokenImage}
                    alt={"logo"}
                    width={20}
                    className="mr-2"
                  />
                  {denomChange(item.denomTrace.baseDenom) === "Unknown"
                    ? stringTruncate(item.denom, 5)
                    : denomChange(item.denomTrace.baseDenom)}
                  ({item.denomTrace.path})
                </MenuItem>
              );
            }
          })}
        </Select>
      </div>
    </div>
  );
};

export default Tokens;
