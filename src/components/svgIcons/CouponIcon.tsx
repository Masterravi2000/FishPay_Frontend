import React from "react";
import Svg, { Path } from "react-native-svg";

const CouponIcon = ({ color, fw }: { color?: string; fw?: string }) => {
  return (
    <Svg
      width="26"
      height="26"
      viewBox="0 0 16 16"
      fill="none"
    >
      <Path
        d="M6 3V5.5M6 6.5V10M6 11V13M1.5 12.5H14.5V10C14 9.833 13 9.2 13 8C13 6.5 14.5 6.5 14.5 6V3.5H1.5V6C2 6.167 3 6.8 3 8C3 9.5 1.5 9.5 1.5 10V12.5Z"
        stroke="gray"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default CouponIcon;
