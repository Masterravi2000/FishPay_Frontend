import React from "react";
import Svg, { Path } from "react-native-svg";

const CardIcon = ({ color, fw }: { color?: string; fw?: string }) => {
  return (
    <Svg
      width="20"
      height="34"
      viewBox="0 0 50 34"
      fill="none"
       stroke="#bbbbbb" strokeWidth={3}

    >
      <Path
        d="M2 10.5714V27.7143C2 28.8509 2.53849 29.941 3.49701 30.7447C4.45553 31.5485 5.75556 32 7.11111 32H42.8889C44.2444 32 45.5445 31.5485 46.503 30.7447C47.4615 29.941 48 28.8509 48 27.7143V10.5714M2 10.5714V6.28571C2 5.14907 2.53849 4.05898 3.49701 3.25526C4.45553 2.45153 5.75556 2 7.11111 2H42.8889C44.2444 2 45.5445 2.45153 46.503 3.25526C47.4615 4.05898 48 5.14907 48 6.28571V10.5714M2 10.5714H48M12.2222 19.1429H25"
        stroke="#bbbbbb"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default CardIcon;
