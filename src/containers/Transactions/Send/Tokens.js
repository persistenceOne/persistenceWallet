import { setTxSendToken } from "../../../store/actions/transactions/send";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useTranslation } from "react-i18next";
import Image from 'next/image';
import { Decimal } from "@cosmjs/math";
import {
  decimalize,
  stringToNumber,
  stringTruncate,
  unDecimalize
} from "../../../utils/scripts";
import { PstakeInfo, DefaultChainInfo, stkATOMInfo } from "../../../config";
import helper, {
  denomChange,
  tokenValueConversion
} from "../../../utils/helper";

const Tokens = () => {
  const { t } = useTranslation();
  const tokenList = useSelector((state) => state.balance.tokenList);
  const transferableAmount = useSelector(
    (state) => state.balance.transferableAmount
  );
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
      setTxSendToken({
        value: tokenData[0]
      })
    );
  }, []);

  const onChangeSelect = (evt) => {
    const tokenDataObject = {};
    dispatch(
      setTxSendToken({
        value: []
      })
    );
    tokenData = [];
    tokenDataObject.token = evt.target.value;
    if (evt.target.value === DefaultChainInfo.currency.coinMinimalDenom) {
      tokenDataObject.tokenDenom = evt.target.value;
      tokenDataObject.transferableAmount = transferableAmount;
    } else {
      tokenList.forEach((item) => {
        if (evt.target.value === item.denom) {
          if (evt.target.value === stkATOMInfo.coinMinimalDenom) {
            tokenDataObject.tokenDenom = evt.target.value;
            tokenDataObject.transferableAmount = tokenValueConversion(
              stringToNumber(item.amount)
            );
          } else {
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
            tokenDataObject.tokenDenom = item.denom;
            tokenDataObject.tokenItem = item;
          }
        }
      });
    }
    tokenData.push(tokenDataObject);
    dispatch(
      setTxSendToken({
        value: tokenData[0]
      })
    );
  };

  return (
    <div className="form-field">
      <p className="label">{t("TOKEN")} </p>
      <div className="form-control-section flex-fill">
        <Select
          className="validators-list-selection"
          displayEmpty={true}
          defaultValue={DefaultChainInfo.currency.coinMinimalDenom}
          required={true}
          onChange={onChangeSelect}
        >
          {tokenList.map((item, index) => {
            if (
              item.denom === DefaultChainInfo.currency.coinMinimalDenom ||
              item.denom === stkATOMInfo.coinMinimalDenom
            ) {
              return (
                <MenuItem key={index + 1} className="" value={item.denom}>
                  <Image
                    src={item.tokenImage}
                    alt={"logo"}
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  {denomChange(item.denom) === "Unknown"
                    ? stringTruncate(item.denom, 5)
                    : denomChange(item.denom)}
                </MenuItem>
              );
            }
            if (item.denom === PstakeInfo.coinMinimalDenom) {
              console.log(
                Decimal.fromAtomics(item.amount, 18).toString(),
                Number(
                  unDecimalize(
                    Decimal.fromAtomics(item.amount, 18).toString(),
                    18
                  )
                ).toString()
              );
              return (
                <MenuItem key={index + 1} className="" value={item.denom}>
                  <Image
                    src={item.tokenImage}
                    alt={"logo"}
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  {helper.denomChange(item.denomTrace.baseDenom)} (
                  {item.denomTrace.path})
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
