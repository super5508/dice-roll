import { NextPage } from "next";

import { Button, Input, Icons } from "@/components";

const IndexPage: React.FC<NextPage> = () => {
  return (
    <div className="flex-1 max-w-[480px] mx-auto flex flex-col">
      <div className="flex-1">Chat Content</div>

      <div>
        <Button className="uppercase">Roll</Button>
        <Input placeholder="/r 2d20kh1+1d4+5" iconBefore={Icons.IconRoll} />
      </div>
    </div>
  );
};

export default IndexPage;
