import React, { useState } from "react";
import Styles from "./styles.module.css";
import Link from "next/link";
import { useWindowSize } from "../../../customHooks/useWindowSize";
import { useRouter } from "next/router";
import { Icon } from "../../atoms/icon";
import BalanceList from "./balanceList";
import Tooltip from "rc-tooltip";
import { useAppStore } from "../../../../store/store";
import { emptyFunc } from "../../../helpers/utils";

const socialList = [
  {
    url: "/",
    iconName: "twitter-logo",
    tooltip: "Twitter",
  },
  {
    url: " https://t.me/pstakefinancechat",
    iconName: "telegram-plane",
    tooltip: "Telegram",
  },
  {
    url: "https://blog.pstake.finance",
    iconName: "medium-m",
    tooltip: "Medium",
  },
  {
    url: "/",
    iconName: "globe",
    tooltip: "Website",
  },
];

const env: string = process.env.NEXT_PUBLIC_ENVIRONMENT!;

const SidebarContent = () => {
  const { isMobile } = useWindowSize();
  const [collapse, setCollapse] = useState(false);
  const handleSidebar = useAppStore((state) => state.handleSidebar);
  const router = useRouter();
  const wallet = true;

  const routeList = [
    {
      icon: "wallet",
      text: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: "staking",
      text: "Staking",
      path: "/staking",
    },
  ];

  return (
    <aside
      className={`${
        collapse ? "w-[54px] md:w-[20px]" : "w-[284px] md:w-[220px]"
      } relative`}
    >
      <button
        className="pl-2 absolute hidden -right-[10px] z-10"
        onClick={() => {
          setCollapse(!collapse);
        }}
      >
        <Icon iconName="menu" viewClass="menu" />
      </button>
      <div
        className={`${Styles.sideBarContent} h-[calc(100vh-84px)] flex flex-col justify-between overflow-y-auto sticky`}
      >
        <div className="pt-8">
          <div className="pb-4">
            {routeList.map((item, index) => (
              <li className={`list-none`} key={index}>
                <Link href={item.path} passHref>
                  <p
                    className={`${
                      router.pathname == item.path
                        ? `bg-black-700 navItemActive`
                        : "group"
                    } 
                py-[0.625rem] px-8 flex items-center cursor-pointer`}
                    onClick={isMobile ? () => handleSidebar(false) : emptyFunc}
                  >
                    <span className={"mr-8 md:mr-4 "}>
                      <Icon
                        iconName={item.icon}
                        viewClass="!w-[20px] !h-auto fill-[#a6a6a6] [.navItemActive_&]:fill-[#c73238] side-bar-icon
                         group-hover:fill-[#fcfcfc]"
                      />
                    </span>
                    <span
                      className="[.navItemActive_&]:text-light-high text-light-mid leading-6 text-base md:text-sm
                      group-hover:text-light-high"
                    >
                      {item.text}
                    </span>
                  </p>
                </Link>
              </li>
            ))}
            {wallet ? (
              <li className={`list-none`}>
                <Link
                  href={`url/address/${"wallet.account"}`}
                  className="nav-link"
                  passHref
                  target={"_blank"}
                >
                  <p
                    className={`${
                      router.pathname == "transactions"
                        ? `border-r-[3px] border-[#c73238] bg-black-700 navItemActive`
                        : "group"
                    } 
                py-[0.625rem] px-8 flex items-center active:bg-sideBar-navLinkActive cursor-pointer`}
                    onClick={isMobile ? () => handleSidebar(false) : emptyFunc}
                  >
                    <span className={"mr-8 md:mr-4 "}>
                      <Icon
                        iconName={"transactions"}
                        viewClass="!w-[20px] !h-auto fill-[#a6a6a6] [.navItemActive_&]:fill-[#c73238] side-bar-icon
                         group-hover:fill-[#fcfcfc]"
                      />
                    </span>
                    <span
                      className="[.navItemActive_&]:text-light-high [.navItemActive_&]:font-semibold
                    text-light-mid leading-6 text-base md:text-sm group-hover:text-light-high"
                    >
                      Transactions
                    </span>
                  </p>
                </Link>
              </li>
            ) : null}
          </div>
        </div>
        <div className="border-t border-solid border-[#2b2b2b]">
          <div className={`socialLinks flex py-3 px-8`}>
            {socialList.map((item, index) => (
              <Tooltip placement="bottom" overlay={item.tooltip} key={index}>
                <a
                  href={item.url}
                  rel="noopener noreferrer"
                  className="mr-2.5"
                  target="_blank"
                >
                  <Icon
                    viewClass="socialIcon fill-[#a6a6a6] !w-[12px] !h-[12px]"
                    iconName={item.iconName}
                  />
                </a>
              </Tooltip>
            ))}
          </div>
          <div className="text-light-low text-xsm font-medium leading-4 pb-3 px-8">
            <a href="https://persistence.one/" target="_blank" rel="noreferrer">
              By Persistence
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarContent;
