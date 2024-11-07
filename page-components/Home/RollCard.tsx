import React from "react";

import { IRollHistory } from "@/context/RollContext";

export const OwnRollCard: React.FC<IRollHistory> = ({
  createdAt,
  notation,
  results,
}) => {
  const sum = results.reduce((prev, current) => {
    return prev + current.allRolls[current.count - 1];
  }, 0);
  return (
    <div className="max-w-fit ml-auto">
      <p className="mb-1 text-outline-default text-right">
        {createdAt.toLocaleDateString()}
      </p>
      <div className="px-4 py-3 rounded-3xl bg-surfaces-500 text-onSurface-variant text-bodyLg">
        <p>/r {notation}</p>
        <p>
          {results
            .map((value) => `( ${value.allRolls[value.count - 1]} )`)
            .join(" + ")}
        </p>
        <p>
          = <span className="text-onSurface-default font-bold">{sum}</span>
        </p>
      </div>
    </div>
  );
};

export const RollCard: React.FC<IRollHistory> = ({
  createdAt,
  notation,
  results,
}) => {
  const sum = results.reduce((prev, current) => {
    return prev + current.allRolls[current.count - 1];
  }, 0);
  return (
    <div className="flex gap-2.5 max-w-fit mr-auto">
      <div className="bg-primary rounded-full font-bold text-bodyLg w-8 h-8">
        G
      </div>
      <div className="p-1 text-onSurface-variant">
        <p>
          <strong className="text-primary">Guest</strong>{" "}
          {createdAt.toLocaleDateString()}
        </p>
        <p>/r {notation}</p>
        <p>
          {results
            .map((value) => `( ${value.allRolls[value.count - 1]} )`)
            .join(" + ")}
        </p>
        <p>
          = <span className="text-onSurface-default font-bold">{sum}</span>
        </p>
      </div>
    </div>
  );
};
