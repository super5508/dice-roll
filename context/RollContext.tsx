import { IDiceRollResponse } from "@/api/Service";
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export const DICE_TYPES = [20, 100, 10, 8, 6, 4] as const;
export type DICE_TYPE = (typeof DICE_TYPES)[number];
export type IRollHistory = IDiceRollResponse & {
  timestamp: Date;
  isOwn: boolean;
};

type RollContextState = {
  rolls: Record<DICE_TYPE, number>;
  rollInput: string;
  activeRolls: DICE_TYPE[];
  rollHistory: IRollHistory[];
  addRoll: (dType: DICE_TYPE) => void;
  removeRoll: (dType: DICE_TYPE) => void;
  setRollInput: (input: string) => void;
  clearActiveRolls: () => void;
  addRollHistory: (newHistory: IRollHistory) => void;
};

const DEFAULT_STATE: RollContextState = {
  rollInput: "",
  rolls: { 4: 0, 6: 0, 8: 0, 10: 0, 20: 0, 100: 0 },
  activeRolls: [],
  rollHistory: [],
  addRoll: () => null,
  removeRoll: () => null,
  setRollInput: () => null,
  clearActiveRolls: () => null,
  addRollHistory: () => null,
};

const RollContext = createContext<RollContextState>(DEFAULT_STATE);

const getActiveInput = (
  rolls: Record<DICE_TYPE, number>,
  activeRolls: DICE_TYPE[]
): string => {
  return DICE_TYPES.filter((type) => activeRolls.includes(type))
    .map((type) => {
      const rollCount = rolls[type];
      return `${rollCount}d${type}`;
    })
    .join("+");
};

export const RollContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [rolls, setRolls] = useState<Record<DICE_TYPE, number>>({
    4: 0,
    6: 0,
    8: 0,
    10: 0,
    20: 0,
    100: 0,
  });
  const [rollInput, setRollInput] = useState("");
  const [activeRolls, setActiveRolls] = useState<DICE_TYPE[]>([]);
  const [rollHistory, setRollHistory] = useState<IRollHistory[]>([]);

  const addRoll = useCallback((dType: DICE_TYPE) => {
    setRolls((prevRolls) => {
      const newRolls = {
        ...prevRolls,
        [dType]: prevRolls[dType] + 1,
      };
      setActiveRolls((prevActiveRolls) => {
        const newActiveRolls = [...prevActiveRolls, dType];
        setRollInput(getActiveInput(newRolls, newActiveRolls));
        return newActiveRolls;
      });
      return newRolls;
    });
  }, []);

  const removeRoll = useCallback((dType: DICE_TYPE) => {
    setRolls((prevRolls) => {
      const newRolls = {
        ...prevRolls,
        [dType]: prevRolls[dType] - 1,
      };
      setActiveRolls((prevActiveRolls) => {
        const newActiveRolls = prevActiveRolls.filter(
          (value) => value !== dType
        );
        setRollInput(getActiveInput(newRolls, newActiveRolls));
        return newActiveRolls;
      });
      return newRolls;
    });
  }, []);

  const clearActiveRolls = useCallback(() => {
    setRollInput("");
    setActiveRolls([]);
  }, []);

  const addRollHistory = useCallback((newHistory: IRollHistory) => {
    setRollHistory((prev) => {
      let newRollHistory = [...prev];
      const ownIndex = newRollHistory.findIndex(
        (p) => p.notation === newHistory.notation
      );
      if (ownIndex > -1) {
        newRollHistory[ownIndex].isOwn = true;
      } else {
        newRollHistory = [...newRollHistory, newHistory];
      }
      return newRollHistory;
    });
  }, []);

  const value = useMemo(
    () => ({
      rolls,
      rollInput,
      activeRolls,
      rollHistory,
      addRoll,
      removeRoll,
      setRollInput,
      clearActiveRolls,
      addRollHistory,
    }),
    [
      addRoll,
      removeRoll,
      clearActiveRolls,
      activeRolls,
      rollInput,
      rolls,
      rollHistory,
      addRollHistory,
    ]
  );

  return <RollContext.Provider value={value}>{children}</RollContext.Provider>;
};

export const useRollContext = () => {
  return useContext(RollContext);
};
