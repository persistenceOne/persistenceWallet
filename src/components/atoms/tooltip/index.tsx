import React from "react";
import { TooltipTypes } from "./types";

const ToolTip = ({
  title,
  children,
  position,
  containerClass,
  theme
}: TooltipTypes) => {
  const tooltipTextClasses =
    "invisible absolute w-[120px] text-center p-1 rounded-md z-10 opacity-0";
  return (
    <div className={`tooltip ${containerClass}`}>
      {children}
      <div
        className={`tooltiptext ${
          theme === "dark" ? `dark` : `light`
        } tooltip-${position}`}
      >
        {title}
        {/*<span className="arrow"/>*/}
      </div>
    </div>
  );
};
export default ToolTip;
