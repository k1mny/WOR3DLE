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

const localStorageDailyEffect =
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
        setObj = { ...lsObj, [dateStr]: newKeyObj };
      }

      localStorage.setItem(localStorageName, JSON.stringify(setObj));
    });
  };

const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    if (typeof window === "undefined") {
      return;
    }
    let savedValue = localStorage.getItem(localStorageName);
    if (savedValue != null) {
      const lsObj = JSON.parse(savedValue);
      if (lsObj[key] != null) {
        setSelf(JSON.parse(lsObj[key]));
      }
    }

    onSet((newValue, _, isReset) => {
      console.log("set: ", newValue);
      savedValue = localStorage.getItem(localStorageName);
      const lsObj = JSON.parse(savedValue);
      localStorage.setItem(
        localStorageName,
        JSON.stringify({ ...lsObj, [key]: newValue })
      );
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
  effects: [localStorageDailyEffect("game-state")],
});

export const useWordleResultTextState = atom({
  key: "useWordleResultTextState",
  default: [],
  effects: [localStorageDailyEffect("result-text")],
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

export const useInfoModalState = atom({
  key: "useInfoModalState",
  default: true,
  effects: [localStorageEffect("is-info-open")],
});

export const useCountInputState = atom({
  key: "useCountInputState",
  default: 0,
  effects: [localStorageDailyEffect("count-input")],
});
