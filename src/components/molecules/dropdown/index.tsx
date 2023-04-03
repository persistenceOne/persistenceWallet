import React, { forwardRef, useEffect, useRef } from "react";
import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import { useOnClickOutside } from "../../../customHooks/useOnClickOutside";
import Button from "../../atoms/button";
import { Icon } from "../../atoms/icon";
import { emptyFunc } from "../../../helpers/utils";

export type DropdownButtonVariants = "primary" | "custom";
export type DropdownType = "hover" | "click";

export type DropdownProps = {
  dropdownLabel: React.ReactNode | string;
  dropdownType?: DropdownType;
  children: React.ReactNode | string;
  className?: string;
  rounded?: boolean;
  staticBackDrop?: boolean;
  dropDownVariant: DropdownButtonVariants;
  dropDownVariantBg?: string;
  dropDownContentClass?: string;
  dropDownButtonClass?: string;
  dropDownIcon?: boolean;
  closeDropdown?: boolean;
  closeHandler?: (closeDropdown: boolean) => void;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      children,
      dropdownLabel,
      className = "",
      rounded = false,
      staticBackDrop = true,
      dropDownVariant = "primary",
      dropDownVariantBg = "",
      dropdownType = "click",
      dropDownIcon = false,
      dropDownButtonClass = "",
      dropDownContentClass = "",
      closeDropdown = false,
      closeHandler = () => {},
    },
    ref
  ) => {
    const topRounding = rounded ? "rounded-t-md" : "";

    const dropDownRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(dropDownRef, () => {
      closeHandler(false);
    });

    return (
      <div
        className={`${topRounding} ${className} text-white relative inline-block dropDown ${
          dropdownType === "click" ? "dropDownClick" : "dropDownHover group"
        }`}
        ref={staticBackDrop ? null : dropDownRef}
      >
        <Button
          className={`${
            dropDownVariant !== "primary"
              ? dropDownVariantBg
                ? `${dropDownVariantBg}`
                : "bg-black-800 text-light-high"
              : ""
          } ${dropDownButtonClass} button w-full md:py-2 md:text-sm flex items-center
            justify-center`}
          type="custom"
          size="medium"
          content={
            <>
              {dropdownLabel}
              {dropDownIcon ? (
                <Icon
                  viewClass={`${
                    !closeDropdown ? "rotate-360" : "rotate-360"
                  } dropDownIcon mx-2 !w-[10px] ease-in duration-200  rotate-90 fill-[#fff]`}
                  iconName="chevron"
                />
              ) : (
                ""
              )}
            </>
          }
          onClick={() => {
            closeHandler(!closeDropdown);
          }}
        />
        <div
          className={`${dropDownContentClass} translate-y-0.5 dropDownContent min-w-full w-fit absolute opacity-0 transition-opacity transform ease duration-200 bg-dropDown left-0 right-0 ${
            closeDropdown ? "visible translate-y-0 opacity-100" : "invisible"
          } text-light-high rounded-md z-10`}
        >
          {children}
        </div>
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";

export default Dropdown;
