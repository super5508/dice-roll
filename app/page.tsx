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
    <div className="flex-1 flex flex-col">
      {rollHistory.length === 0 && (
        <div className="flex-1 flex gap-4 justify-center items-center">
          {new Array(3).fill("").map((_, index) => (
            <div
              className="border-outline-variant rounded-2xl w-[240px] h-[160px] border"
              key={index}
            />
          ))}
        </div>
      )}
      <div className="max-w-[480px] mx-auto flex flex-col flex-grow overflow-y-auto">
        <div className="flex-1 space-y-3">
          {rollHistory.map((history, index) =>
            history.isOwn ? (
              <OwnRollCard key={index} {...history} />
            ) : (
              <RollCard key={index} {...history} />
            )
          )}
        </div>

        <div className="w-[480px] mt-8">
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
    </div>
  );
};

export default IndexPage;
