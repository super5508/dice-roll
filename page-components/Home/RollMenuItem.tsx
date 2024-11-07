import React, { ButtonHTMLAttributes } from "react";
import clsx from "classnames";

import { DICE_TYPE } from "@/context/RollContext";

export interface IRollMenuItem extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  dType: DICE_TYPE;
  rollCount: number;
  isActive?: boolean;
}

export const RollMenuItem: React.FC<IRollMenuItem> = ({
  icon,
  dType,
  rollCount,
  isActive = false,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "bg-transparent outline-none flex gap-2.5 items-center text-bodyLg py-2 w-[90px]",
        isActive ? "text-onSurface-default" : "text-outline-default"
      )}
      {...props}
    >
      <span
        className={clsx(isActive ? "text-primary" : "text-onSurface-default")}
      >
        {icon}
      </span>
      {rollCount > 0 ? rollCount : "-"}d{dType}
    </button>
  );
};
