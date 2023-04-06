import React, { useEffect } from "react";
import { Icon } from "../../atoms/icon";
import Link from "next/link";
import { useWindowSize } from "../../../customHooks/useWindowSize";
import { useAppStore } from "../../../../store/store";

const env: string = process.env.NEXT_PUBLIC_ENVIRONMENT!;

const NavigationBar = () => {
  const handleSidebar = useAppStore((state) => state.handleSidebar);
  const { isMobile } = useWindowSize();

  const handleMenu = () => {
    handleSidebar(true);
  };

  // loading exchangeRate before connecting wallet
  useEffect(() => {
    const fetchInitialInstances = async () => {};
    console.log("fetchInitialInstances");
    fetchInitialInstances();
  }, []);

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
            <p>sdfdsf</p>
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
