import React, { useEffect, useState } from "react";
import { Icon } from "../../atoms/icon";
import Link from "next/link";
import { useWindowSize } from "../../../customHooks/useWindowSize";
import { useAppStore } from "../../../../store/store";
import { Spinner } from "../../atoms/spinner";
import { BalanceList } from "../../../helpers/types";
import Dropdown from "../../molecules/dropdown";
import { resetStore, stringTruncate } from "../../../helpers/utils";
import Copy from "../../molecules/copy";
import { useRouter } from "next/router";

const env: string = process.env.NEXT_PUBLIC_ENVIRONMENT!;

const NavigationBar = () => {
  const handleSidebar = useAppStore((state) => state.handleSidebar);
  const accountDetails = useAppStore((state) => state.wallet.accountDetails);
  const handleCreateWalletKeystoreModal = useAppStore(
    (state) => state.handleCreateWalletKeystoreModal
  );
  const { isMobile } = useWindowSize();
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);

  const handleMenu = () => {
    handleSidebar(true);
  };

  console.log(accountDetails, "accountDetails");

  // loading exchangeRate before connecting wallet
  useEffect(() => {
    const fetchInitialInstances = async () => {};
    console.log("fetchInitialInstances");
    fetchInitialInstances();
  }, []);

  const dropCloseDownHandler = (value: boolean) => {
    setShow(value);
  };

  const logoutHandler = () => {
    resetStore();
    localStorage.clear();
    router.push("/");
  };

  return (
    <div className="border-b border-solid border-[#2b2b2b]">
      <div className="flex py-6 mx-8">
        <div className="flex items-center flex-1">
          <div className="">
            <Link href="/" className="nav-link" passHref>
              <img
                src={"/images/logo.svg"}
                alt={"logo"}
                width={isMobile ? 90 : 124}
              />
            </Link>
          </div>
          <div className="flex ml-auto">
            <Dropdown
              className="text-light-high w-full"
              dropDownVariant="custom"
              closeDropdown={show}
              closeHandler={(value) => dropCloseDownHandler(value)}
              dropdownLabel={
                <div className="flex items-center">
                  <img src={"/images/profile.svg"} alt={"logo"} width={20} />
                </div>
              }
              dropDownButtonClass="cursor-pointer p-2 bg-black-600 justify-between text-[12px] text-light-emphasis
               rounded-full"
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
                  <Icon
                    iconName="qr-code"
                    viewClass="!w-[12px] !h-[12px] ml-2"
                  />
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
                <p className="text-sm text-light-emphasis font-medium">
                  Logout
                </p>
              </div>
            </Dropdown>
            <button className="md:block hidden pl-2" onClick={handleMenu}>
              <Icon iconName="menu" viewClass="menu" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
