import React from "react";
import Button from "./../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { keyStoreSubmit } from "../../../store/actions/transactions/keyStore";
import { LOGIN_INFO } from "../../../constants/localStorage";

const Submit = () => {
  const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));
  const password = useSelector((state) => state.keyStore.password);
  const accountNumber = useSelector((state) => state.advanced.accountNumber);
  const accountIndex = useSelector((state) => state.advanced.accountIndex);
  const bip39PassPhrase = useSelector(
    (state) => state.advanced.bip39PassPhrase
  );
  const keyStoreData = useSelector((state) => state.keyStore.keyStore);
  const encryptedSeed = useSelector(
    (state) => state.common.loginInfo.encryptedSeed
  );

  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(keyStoreSubmit(loginInfo && loginInfo.address));
  };

  const fee = useSelector((state) => state.fee.fee);
  const gas = useSelector((state) => state.gas.gas);

  const disable =
    keyStoreData.error.message !== "" ||
    (keyStoreData.value === "" && !encryptedSeed) ||
    password.value === "" ||
    fee.error.message !== "" ||
    gas.error.message !== "" ||
    password.error.message !== "" ||
    accountNumber.error.message !== "" ||
    accountIndex.error.message !== "" ||
    bip39PassPhrase.error.message !== "";

  return (
    <div className="buttons">
      <div className="button-section">
        <Button
          className="button button-primary"
          type="button"
          disable={disable}
          value="Submit"
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default Submit;
