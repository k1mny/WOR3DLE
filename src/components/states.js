import { atom } from "recoil";

export const useBoxApiState = atom({
  key: "useBoxApiState",
  default: [],
  dangerouslyAllowMutability: true,
});

export const useClearState = atom({
  key: "useClearState",
  default: null,
});

export const useWordInputState = atom({
  key: "useWordInputState",
  default: "",
});

export const useContentsState = atom({
  key: "useContentsState",
  default: [],
});
