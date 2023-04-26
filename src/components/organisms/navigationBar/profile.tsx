import React, { useState } from "react";
import Dropdown from "../../molecules/dropdown";
import Copy from "../../molecules/copy";
import { resetStore, stringTruncate } from "../../../helpers/utils";
import { Icon } from "../../atoms/icon";
import { useAppStore } from "../../../../store/store";
import { useRouter } from "next/router";

const Profile = () => {
  const [show, setShow] = useState<boolean>(false);
  const dropCloseDownHandler = (value: boolean) => {
    setShow(value);
  };
  const router = useRouter();
  const accountDetails = useAppStore((state) => state.wallet.accountDetails);
  const handleCreateWalletKeystoreModal = useAppStore(
    (state) => state.handleCreateWalletKeystoreModal
  );
  const logoutHandler = () => {
    resetStore();
    localStorage.clear();
    router.push("/");
  };
  return (
    <Dropdown
      className="text-light-high w-full"
      dropDownVariant="custom"
      closeDropdown={show}
      closeHandler={(value) => dropCloseDownHandler(value)}
      dropdownLabel={
        <div className="flex items-center px-2 text-sm">
          <span className="mr-2"> Profile</span>
          <img src={"/images/profile.svg"} alt={"logo"} width={20} />
        </div>
      }
      dropDownButtonClass="cursor-pointer !w-fit p-2 bg-black-600 justify-between text-[12px] text-light-emphasis
               rounded-md"
      dropdownType={"click"}
      staticBackDrop={false}
      dropDownIcon={false}
      dropDownContentClass="!w-[180px] !bg-[#282828] drop-shadow-md round-md
                       py-1 md:p-0"
    >
      <div
        className="px-4 py-2 flex items-center justify-center md:py-3
                        hover:cursor-pointer hover:bg-[#383838] text-dark-high whitespace-nowrap"
      >
        <p className="text-sm text-light-emphasis font-medium flex items-center">
          <Copy
            id={accountDetails.address ? accountDetails.address : ""}
            customView={
              <span>
                {stringTruncate(
                  accountDetails.address ? accountDetails.address : "",
                  6
                )}
              </span>
            }
          />
          <Icon iconName="qr-code" viewClass="!w-[12px] !h-[12px] ml-2" />
        </p>
      </div>
      <div
        className="px-4 py-2 flex items-center justify-center md:py-3
                        hover:cursor-pointer hover:bg-[#383838] text-dark-high whitespace-nowrap"
        onClick={() => handleCreateWalletKeystoreModal(true)}
      >
        <p className="text-sm text-light-emphasis font-medium">
          Generate KeyStore
        </p>
      </div>
      <div
        className="px-4 py-2 flex items-center justify-center md:py-3
                        hover:cursor-pointer hover:bg-[#383838] text-dark-high whitespace-nowrap"
        onClick={logoutHandler}
      >
        <p className="text-sm text-light-emphasis font-medium">Logout</p>
      </div>
    </Dropdown>
  );
};

export default Profile;
