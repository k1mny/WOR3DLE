import { COLOR_CLEAR, CORRECT, INCORRECT, WRONG } from "./constants";
import { acceptableWords } from "./words";

const date = new Date();
const [month, day, year] = [
  date.getMonth() + 1,
  date.getDate(),
  date.getFullYear(),
];
let index = (year << 10) + (month << 5) + day;
const wordleAnswer = acceptableWords[index % acceptableWords.length]
  .toUpperCase()
  .split("");

export const getWordleAnswer = () => {
  return wordleAnswer.join("");
};

export const isCharWordleAnswer = (c, pos) => {
  if (wordleAnswer[pos] === c) {
    return CORRECT;
  } else if (wordleAnswer.includes(c)) {
    return INCORRECT;
  } else {
    return WRONG;
  }
};

export const Judge = (posx, word) => {
  let index = 0;
  if (posx < -3) {
    index = 0;
  } else if (posx < -1) {
    index = 1;
  } else if (posx < 1) {
    index = 2;
  } else if (posx < 3) {
    index = 3;
  } else {
    index = 4;
  }

  return isCharWordleAnswer(word, index);
};

export const checkClear = (api, pos, posFloor) => {
  // ブロックが正解しているかのフラグ
  const col = COLOR_CLEAR;
  const flgs = api.map((obj) => col.equals(obj.mat.current.color));

  // ブロックの位置(高さ)からグループ分け
  const group = pos.current.map((posy) => {
    if (posy < posFloor + 2) {
      return 0;
    } else if (posy < posFloor + 4) {
      return 1;
    } else if (posy < posFloor + 6) {
      return 2;
    } else if (posy < posFloor + 8) {
      return 3;
    } else if (posy < posFloor + 10) {
      return 4;
    } else if (posy < posFloor + 12) {
      return 5;
    } else {
      return 10;
    }
  });

  for (let i = 0; i < Math.floor(flgs.length / 5); i++) {
    if (flgs.filter((flg, index) => flg && group[index] === i).length === 5) {
      return true;
    }
  }

  return false;
};

export const checkInputWord = (input) => {
  return acceptableWords.includes(input);
};
