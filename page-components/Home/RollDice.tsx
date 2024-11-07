"use client";

import React, { Fragment, MouseEvent, useCallback } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import { Button, Icons } from "@/components";
import { useRollContext, DICE_TYPE } from "@/context/RollContext";
import { getDiceRolls } from "@/api/Service";

import { RollMenuItem, IRollMenuItem } from "./RollMenuItem";

const menuItems: Omit<IRollMenuItem, "rollCount">[] = [
  { dType: 20, icon: <Icons.IconDice20 /> },
  { dType: 100, icon: <Icons.IconDice100 /> },
  { dType: 10, icon: <Icons.IconDice10 /> },
  { dType: 8, icon: <Icons.IconDice8 /> },
  { dType: 6, icon: <Icons.IconDice6 /> },
  { dType: 4, icon: <Icons.IconDice4 /> },
];

export const RollDice: React.FC = () => {
  const {
    rolls,
    addRoll,
    removeRoll,
    activeRolls,
    clearActiveRolls,
    rollInput,
    addRollHistory,
  } = useRollContext();

  const handleSelectDiceType = useCallback(
    (event: MouseEvent<HTMLButtonElement>, dType: DICE_TYPE) => {
      event.preventDefault();
      if (!activeRolls.includes(dType)) {
        addRoll(dType);
      } else {
        removeRoll(dType);
      }
    },
    [addRoll, removeRoll, activeRolls]
  );

  const handleRoll = useCallback(
    async (close: () => void) => {
      try {
        const roll = await getDiceRolls(rollInput);
        if (roll) {
          addRollHistory({ ...roll, isOwn: true, timestamp: new Date() });
        }
      } catch {
        console.error("Failed to get dice roll");
      } finally {
        close();
        clearActiveRolls();
      }
    },
    [clearActiveRolls, activeRolls, rollInput, addRollHistory]
  );

  return (
    <Menu>
      <MenuButton>{Icons.IconRoll}</MenuButton>
      <MenuItems
        anchor="top start"
        className="bg-surfaces-500 border border-outline-variant rounded-2xl py-2 px-3 gap-1 grid "
      >
        {menuItems.map((item, index) => (
          <MenuItem as={Fragment} key={index}>
            {() => (
              <RollMenuItem
                {...item}
                rollCount={rolls[item.dType]}
                key={index}
                onClick={(e) => handleSelectDiceType(e, item.dType)}
                isActive={activeRolls.includes(item.dType)}
              />
            )}
          </MenuItem>
        ))}
        <MenuItem as={Fragment}>
          {({ close }) => (
            <div className="py-1">
              <Button
                className="uppercase"
                fullWidth
                onClick={() => handleRoll(close)}
                disabled={!rollInput}
              >
                Roll
              </Button>
            </div>
          )}
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};
