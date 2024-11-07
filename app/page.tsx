"use client";

import { NextPage } from "next";

import { Input } from "@/components";
import { RollDice } from "@/page-components/Home/RollDice";
import { useRollContext } from "@/context/RollContext";
import {
  API_URL,
  fetchAccessToken,
  IDiceRollSocketMessage,
} from "@/api/Service";
import { useEffect } from "react";
import { OwnRollCard, RollCard } from "@/page-components/Home/RollCard";
import io, { Socket } from "socket.io-client";

let socket: Socket;

const IndexPage: React.FC<NextPage> = () => {
  const { rollInput, setRollInput, rollHistory, addRollHistory } =
    useRollContext();

  useEffect(() => {
    socket = io(API_URL);

    socket.on("diceRoll", (data) => {
      const { timestamp, ...newHistory } = data as IDiceRollSocketMessage;
      addRollHistory({
        ...newHistory,
        isOwn: false,
        notationAsJson: [],
        timestamp: new Date(timestamp),
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    (async () => {
      await fetchAccessToken();
    })();
  }, []);

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
