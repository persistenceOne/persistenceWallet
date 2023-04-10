import React, { useEffect, useState } from "react";
import { Icon } from "../../atoms/icon";
import Link from "next/link";
import { useWindowSize } from "../../../customHooks/useWindowSize";
import { useAppStore } from "../../../../store/store";

const env: string = process.env.NEXT_PUBLIC_ENVIRONMENT!;

const NavigationBar = () => {
  const handleWalletSignInModal = useAppStore(
    (state) => state.handleWalletSignInModal
  );

  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const { isMobile } = useWindowSize();

  const headerList = [
    {
      name: "Learn More",
      url: "https://persistence.one/",
    },
    {
      name: "Help",
      url: "https://notes.persistence.one/s/9l80_chis",
    },
  ];

  // loading exchangeRate before connecting wallet
  useEffect(() => {
    const fetchInitialInstances = async () => {};
    console.log("fetchInitialInstances");
    fetchInitialInstances();
  }, []);

  const signInHandler = () => {
    handleWalletSignInModal(true);
  };

  return (
    <div className="flex mb-10 py-6 pl-7 pr-14 md:px-3">
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
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="outline-none inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg
           -md:hidden focus:outline-none"
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={() => {
              setIsNavExpanded(!isNavExpanded);
            }}
          >
            <span className="sr-only">Open main menu</span>
            <Icon iconName={"menu"} viewClass={"w-[20px]"} />
          </button>
          <div
            className={`${
              isNavExpanded ? "block" : "hidden"
            } -md:block w-full -md:w-auto`}
            id="navbar-default"
          >
            <ul className="flex flex-col mt-4 -md:flex-row -md:space-x-8 -md:mt-0">
              <li className="text-light-high font-medium text-sm cursor-pointer">
                <p
                  className={`block py-2 pr-0 pl-3 text-white`}
                  aria-current="page"
                  onClick={signInHandler}
                >
                  signIn
                </p>
              </li>
              {headerList.map((item, index) => (
                <li className="text-light-high font-medium text-sm" key={index}>
                  <a
                    href={item.url}
                    target={"_blank"}
                    rel="noreferrer"
                    className={`block py-2 pr-0 pl-3 text-white`}
                    aria-current="page"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
