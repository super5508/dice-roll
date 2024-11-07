import { DICE_TYPE } from "@/context/RollContext";

const TOKEN_KEY = "_accessToken_";
export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type IAccessTokenResponse = {
  accessToken: string;
};

export const fetchAccessToken = async (useSaved = true) => {
  try {
    const storedToken = window.localStorage.getItem(TOKEN_KEY);
    if (storedToken && useSaved) return;
    const response = await fetch(`${API_URL}/api/access-token`, {
      method: "POST",
    });
    const json = (await response.json()) as IAccessTokenResponse;
    window.localStorage.setItem(TOKEN_KEY, json.accessToken);
  } catch {
    console.error("Failed to fetch access token");
  }
};

export type IDiceRollResponse = {
  notation: string;
  notationAsJson: {
    count: number;
    sides: DICE_TYPE;
    negative: boolean;
  }[];
  results: {
    type: "dice";
    count: number;
    sides: DICE_TYPE;
    allRolls: number[];
    keptRolls: number[];
    total: number;
  }[];
  sum: number;
};

export type IDiceRollSocketMessage = {
  notation: string;
  results: {
    type: "dice";
    count: number;
    sides: DICE_TYPE;
    allRolls: number[];
    keptRolls: number[];
    total: number;
  }[];
  sum: number;
  timestamp: string;
};

export const getDiceRolls = async (rollText: string) => {
  try {
    const fetchRoll = async () => {
      const accessToken = window.localStorage.getItem(TOKEN_KEY) ?? "";
      const response = await fetch(
        `${API_URL}/api/dice-rolls/${rollText}/?accessToken=${accessToken}&verbose=true`
      );
      return response;
    };
    const response = await fetchRoll();
    if (response.ok) {
      const json = await response.json();
      return json as IDiceRollResponse;
    } else if (response.status === 401) {
      await fetchAccessToken(false);
      const response = await fetchRoll();
      if (response.ok) {
        const json = await response.json();
        return json as IDiceRollResponse;
      }
    }
  } catch {
    console.error("Failed to fetch access token");
  }
};
