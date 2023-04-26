import React, { useState } from "react";
import Dropdown from "../../molecules/dropdown";
import { Icon } from "../../atoms/icon";
import { useAppStore } from "../../../../store/store";
import { stringTruncate } from "../../../helpers/utils";
import { AccountDetails, CoinType } from "../../../../store/slices/wallet";
import useLocalStorage from "../../../customHooks/useLocalStorage";

const SwitchAccount = () => {
  const [show, setShow] = useState<boolean>(false);
  const [activeCoinType, setActiveCoinType] = useState<string>("");
  const [accountInfo, setAccountInfo] = useLocalStorage("accountDetails", "");
  const keyStoreLoginDetails = useAppStore(
    (state) => state.wallet.keyStoreLoginDetails
  );
  const accountDetails = useAppStore((state) => state.wallet.accountDetails);
  const handleWalletAccountDetails = useAppStore(
    (state) => state.handleWalletAccountDetails
  );
  const dropCloseDownHandler = (value: boolean) => {
    setShow(value);
  };

  const handleSwitchWallet = (coinType: CoinType) => {
    let keystoreInfo: any = "";
    if (coinType === 750) {
      keystoreInfo = keyStoreLoginDetails.coin750Info;
    } else {
      keystoreInfo = keyStoreLoginDetails.coin118Info;
    }
    const updateData: AccountDetails = {
      accountType: keystoreInfo.accountType,
      address: keystoreInfo.address,
      loginType: "keyStore",
      accountIndex: accountDetails.accountIndex,
      accountNumber: accountDetails.accountNumber,
      bipPasPhrase: accountDetails.bipPasPhrase!,
    };

    handleWalletAccountDetails(updateData);
    setAccountInfo(updateData);
    window.location.reload();
  };

  return (
    <Dropdown
      className="text-light-high w-full ml-4"
      dropDownVariant="custom"
      closeDropdown={show}
      closeHandler={(value) => dropCloseDownHandler(value)}
      dropdownLabel={
        <div className="flex items-center px-2">
          <span className="mr-2 whitespace-nowrap text-sm"> Switch Wallet</span>
          <Icon iconName="switch-account" viewClass="menu" />
        </div>
      }
      dropDownButtonClass="cursor-pointer p-2 w-max bg-black-600 justify-between text-[12px] text-light-emphasis
               rounded-md"
      dropdownType={"click"}
      staticBackDrop={false}
      dropDownIcon={false}
      dropDownContentClass="min-w-full w-fits !bg-[#282828] drop-shadow-md round-md
                       py-1 md:p-0"
    >
      <div
        className={`${
          keyStoreLoginDetails.coin118Info?.address === accountDetails.address
            ? "bg-[#383838]"
            : ""
        } px-4 py-2 md:py-3 hover:cursor-pointer hover:bg-[#383838] text-dark-high whitespace-nowrap`}
        onClick={() => handleSwitchWallet(118)}
      >
        <p className="text-sm text-light-emphasis font-medium flex items-center mb-1">
          {stringTruncate(keyStoreLoginDetails.coin118Info?.address!, 8)}
        </p>
        <p className="text-xsm text-light-mid font-medium flex items-center">
          <span className="bg-[#1c9e61] text-light-high px-1 rounded-sm mr-1">
            118 Coin-type wallet
          </span>
          <span className="text-[10px]">(Recommended)</span>
        </p>
      </div>
      <div
        className={`${
          keyStoreLoginDetails.coin750Info?.address === accountDetails.address
            ? "bg-[#383838]"
            : ""
        } px-4 py-2 md:py-3 hover:cursor-pointer hover:bg-[#383838] text-dark-high whitespace-nowrap`}
        onClick={() => handleSwitchWallet(750)}
      >
        <p className="text-sm text-light-emphasis font-medium flex items-center mb-1">
          {stringTruncate(keyStoreLoginDetails.coin750Info?.address!, 8)}
        </p>
        <p className="text-xsm text-light-mid font-medium flex items-center">
          <span className="bg-[#1c9e61] text-light-high px-1 rounded-sm mr-1">
            750 Coin-type wallet
          </span>
        </p>
      </div>
    </Dropdown>
  );
};

export default SwitchAccount;
