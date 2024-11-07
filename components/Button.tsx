import React, { ButtonHTMLAttributes } from "react";
import clsx from "classnames";

type ButtonSize = "lg" | "md" | "sm";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  fullWidth?: boolean;
}

const textSize: Record<ButtonSize, string> = {
  lg: "text-buttonLg tracking-[1.2px]",
  md: "text-buttonMd tracking-[1px]",
  sm: "text-buttonSm tracking-[0.8px]",
};

export const Button: React.FC<ButtonProps> = ({
  size = "md",
  fullWidth = false,
  disabled = false,
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "py-[10px] px-4 text-center rounded-[4px] border text-primary font-bold transition-all",
        { "text-onSurface-default text-opacity-35 ": disabled },
        disabled ? "border-onSurface-default/15" : "border-outline-default",
        textSize[size],
        { "w-full": fullWidth },
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
