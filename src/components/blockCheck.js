import { useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { checkClear } from "./logic";
import { useBoxApiState, useClearState } from "./states";

const BlockCheck = () => {
  const ref = useRef([]);
  const boxApi = useRecoilValue(useBoxApiState);
  // 定期的に各ブロックの高さを取得
  useFrame(({ clock }) => {
    // 判定
    if (clock.oldTime % 100 === 0) {
      boxApi.forEach((box, index) =>
        box.api.position.subscribe((p) => (ref.current[index] = p[1]))
      );
    }
  });

  const { viewport } = useThree();
  const [clear, setClear] = useRecoilState(useClearState);

  const checkClearContinuously = useCallback(() => {
    if (clear !== "clear" && clear !== "failed") {
      const posFloor = -viewport.height / 2;
      setClear(checkClear(boxApi, ref, posFloor) ? "clear" : "progressing");
    }
  }, [clear, viewport.height, setClear, boxApi, ref]);

  // 定期的にクリアの確認
  useEffect(() => {
    const intervalId = setInterval(() => {
      checkClearContinuously();
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [checkClearContinuously, ref]);

  return null;
};

export default BlockCheck;
