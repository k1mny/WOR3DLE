import { Box } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  useBoxApiState,
  useClearState,
  useContentsState,
  useWordInputState,
  useWrongMessageState,
} from "./states";
import "react-simple-keyboard/build/css/index.css";
import { checkInputWord } from "./logic";
import { COLOR_CLEAR, COLOR_INCORRECT, COLOR_WRONG } from "./constants";

export default function SoftKeyboard(props) {
  const [wordInput, setWordInput] = useRecoilState(useWordInputState);
  const [contents, setContents] = useRecoilState(useContentsState);
  const [clear, setClear] = useRecoilState(useClearState);
  const [boxApi, setBoxApi] = useRecoilState(useBoxApiState);
  const setWrongMessage = useSetRecoilState(useWrongMessageState);
  const [putEnter, setPutEnter] = useState(false);
  const keyboard = useRef();

  useEffect(() => {
    if (contents.length >= 30 && wordInput.length === 0) {
      setTimeout(() => {
        if (clear !== "clear") {
          setClear("failed");
        }
      }, 5000);
    }
  }, [clear, contents.length, setClear, wordInput.length]);

  const onKeyPress = (button) => {
    if (button === "{enter}" && contents.length <= 30) {
      // setContents([...contents, ...wordInput]);
      setTimeout(() => setPutEnter(!putEnter), 1000);
      if (wordInput.length === 5) {
        if (checkInputWord(wordInput.toLowerCase())) {
          setWordInput("");
          keyboard.current.clearInput();
        } else {
          setWrongMessage("Not in word list");
        }
      } else {
        setWrongMessage("Not enough letters");
      }
    }

    if (button === "{backspace}") {
      if (wordInput.length !== 0 && contents.length !== 0) {
        setWordInput((old) => old.slice(0, -1));
        setBoxApi((old) => old.slice(0, -1));
        setContents(contents.slice(0, -1));
      }
    }

    // word input
    if (
      button !== "{enter}" &&
      button !== "{backspace}" &&
      wordInput.length < 5 &&
      contents.length < 30
    ) {
      setWordInput((old) => old + button.toUpperCase());
      setContents([...contents, button.toUpperCase()]);
    }
  };

  const getButtonTheme = useCallback(() => {
    const charFlgs = contents.map((c, idx) => {
      if (idx >= contents.length - wordInput.length || idx >= boxApi.length) {
        return "none";
      } else if (
        COLOR_CLEAR.equals(boxApi[idx].mat.current.color) ||
        COLOR_INCORRECT.equals(boxApi[idx].mat.current.color)
      ) {
        return "exist";
      } else {
        return "wrong";
      }
    });

    let buttonTheme = [];
    const wrongChars = contents
      .filter((c, idx) => {
        return charFlgs[idx] === "wrong";
      })
      .filter((c, idx, self) => {
        return self.indexOf(c) === idx;
      })
      .join(" ");
    if (wrongChars.length > 0) {
      buttonTheme.push({
        class: "hg-wrong",
        buttons: wrongChars.toLowerCase(),
      });
    }

    const existChars = contents
      .filter((c, idx) => {
        return charFlgs[idx] === "exist";
      })
      .filter((c, idx, self) => {
        return self.indexOf(c) === idx;
      })
      .join(" ");
    if (existChars.length > 0) {
      buttonTheme.push({
        class: "hg-exist",
        buttons: existChars.toLowerCase(),
      });
    }

    return buttonTheme;
  }, [boxApi, contents, putEnter]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "150px",
        bottom: "0",
        backgroundColor: "#4c4c4c",
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "5",
      }}
    >
      <Box sx={{ width: "100%", minWidth: "300px", maxWidth: "500px" }}>
        <Keyboard
          keyboardRef={(r) => (keyboard.current = r)}
          layoutName={"default"}
          onKeyPress={onKeyPress}
          layout={{
            default: [
              "q w e r t y u i o p",
              "a s d f g h j k l",
              "{enter} z x c v b n m {backspace}",
            ],
          }}
          display={{
            q: "Q",
            w: "W",
            e: "E",
            r: "R",
            t: "T",
            y: "Y",
            u: "U",
            i: "I",
            o: "O",
            p: "P",
            a: "A",
            s: "S",
            d: "D",
            f: "F",
            g: "G",
            h: "H",
            j: "J",
            k: "K",
            l: "L",
            z: "Z",
            x: "X",
            c: "C",
            v: "V",
            b: "B",
            n: "N",
            m: "M",
            "{enter}": "ENTER",
            "{backspace}": "&lArr;",
          }}
          theme={"hg-theme-default hg-layout-default myTheme"}
          buttonTheme={getButtonTheme()}
          physicalKeyboardHighlight={true}
          physicalKeyboardHighlightPress={true}
        />
      </Box>
    </Box>
  );
}
