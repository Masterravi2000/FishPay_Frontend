import React from "react";
import Svg, { Path } from "react-native-svg";

const StarIcon = ({ color, fw }: { color?: string; fw?: string }) => {
  return (
    <Svg
      width="14"
      height="14"
      viewBox="0 0 83 83"
      fill="none"
    >
      <Path
        d="M20.1449 72.625L25.7647 48.3302L6.91675 31.9895L31.8167 29.8281L41.5001 6.91663L51.1834 29.8281L76.0834 31.9895L57.2355 48.3302L62.8553 72.625L41.5001 59.7427L20.1449 72.625Z"
        fill="#61c035"
      />
    </Svg>
  );
};

export default StarIcon;
