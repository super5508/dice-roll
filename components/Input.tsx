import React, { InputHTMLAttributes } from "react";
import clsx from "classnames";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  iconBefore?: React.ReactNode;
  addon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  iconBefore,
  className,
  addon,
  ...props
}) => {
  const hasIconBefore = !!iconBefore;
  return (
    <div
      className={clsx(
        "flex h-12 rounded-full bg-surfaces-500 py-1 pr-3 items-center gap-2",
        hasIconBefore ? "pl-1.5" : "pl-3"
      )}
    >
      {iconBefore && iconBefore}
      {addon && <span className="text-outline-default block">{addon}</span>}
      <input
        className={clsx(
          "h-10 text-bodyLg bg-transparent outline-0 border-none w-full placeholder:text-outline-default text-onSurface-default",
          className
        )}
        {...props}
      />
    </div>
  );
};
