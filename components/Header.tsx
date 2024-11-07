import React from "react";

import { Logo } from "./Logo";

export const Header: React.FC = () => {
  return (
    <header>
      <nav className="px-5 h-[68px] flex items-center">
        <Logo />
      </nav>
    </header>
  );
};
