import deepmerge from "deepmerge";
import merge from "deepmerge";
import { atom } from "recoil";

const date = new Date();
const [month, day, year] = [
  date.getMonth() + 1,
  date.getDate(),
  date.getFullYear(),
];
const dateStr =
  year.toString() + ("00" + month).slice(-2) + ("00" + day).slice(-2);
const localStorageName = "wor3dle-results";

const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    if (typeof window === "undefined") {
      return;
    }
    let savedValue = localStorage.getItem(localStorageName);
    if (savedValue !== null) {
      const lsObj = JSON.parse(savedValue);
      if (lsObj[dateStr] != undefined && lsObj[dateStr][key] != undefined) {
        setSelf(lsObj[dateStr][key]);
      }
    }

    onSet((newValue, _, isReset) => {
      savedValue = localStorage.getItem(localStorageName);
      let setObj = { [dateStr]: { [key]: newValue } };
      if (savedValue !== null) {
        const lsObj = JSON.parse(savedValue);
        const targetObj = lsObj[dateStr];
        const newKeyObj = {
          ...targetObj,
          [key]: newValue,
        };
        console.log("lsObj: ", lsObj);
        setObj = { ...lsObj, [dateStr]: newKeyObj };
        console.log("setObj: ", setObj);
      }

      localStorage.setItem(localStorageName, JSON.stringify(setObj));
    });
  };

export const useBoxApiState = atom({
  key: "useBoxApiState",
  default: [],
  dangerouslyAllowMutability: true,
});

export const useClearState = atom({
  key: "useClearState",
  default: null,
  effects: [localStorageEffect("game-state")],
});

export const useWordleResultTextState = atom({
  key: "useWordleResultTextState",
  default: [],
  effects: [localStorageEffect("result-text")],
});

export const useWordInputState = atom({
  key: "useWordInputState",
  default: "",
});

export const useContentsState = atom({
  key: "useContentsState",
  default: [],
});

export const useWrongMessageState = atom({
  key: "useWrongMessageState",
  default: "",
});
