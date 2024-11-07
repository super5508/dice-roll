"use client";

import { NextPage } from "next";

import { Input } from "@/components";
import { RollDice } from "@/page-components/Home/RollDice";
import { useRollContext } from "@/context/RollContext";
import { fetchAccessToken } from "@/api/Service";
import { useEffect } from "react";
import { OwnRollCard, RollCard } from "@/page-components/Home/RollCard";

const IndexPage: React.FC<NextPage> = () => {
  const { rollInput, setRollInput, rollHistory } = useRollContext();

  useEffect(() => {
    (async () => {
      await fetchAccessToken();
    })();
  }, []);

  console.log(rollHistory);

  return (
    <div className="flex-1 max-w-[480px] mx-auto flex flex-col">
      <div className="flex-1 space-y-3">
        {rollHistory.map((history, index) =>
          history.isOwn ? (
            <OwnRollCard key={index} {...history} />
          ) : (
            <RollCard key={index} {...history} />
          )
        )}
      </div>

      <div className="w-[480px]">
        <Input
          placeholder="2d20kh1+1d4+5"
          iconBefore={<RollDice />}
          className="w-[480px]"
          value={rollInput}
          addon="/r"
          onChange={(e) => setRollInput(e.target.value)}
        />
      </div>
    </div>
  );
};

export default IndexPage;
