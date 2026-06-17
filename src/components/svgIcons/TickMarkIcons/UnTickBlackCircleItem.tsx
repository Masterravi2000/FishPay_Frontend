import React from "react";
import Svg, { Path } from "react-native-svg";

const UnTickBlackCircleIcon = ({
  color,
  fw,
}: {
  color?: string;
  fw?: string;
}) => {
  return (
    <Svg
      width="20"
      height="20"
      viewBox="0 0 53 53"
      fill="#a0a0a0"
    >
      <Path
        d="M26.5001 4.41663C14.3542 4.41663 4.41675 14.3541 4.41675 26.5C4.41675 38.6458 14.3542 48.5833 26.5001 48.5833C38.6459 48.5833 48.5834 38.6458 48.5834 26.5C48.5834 14.3541 38.6459 4.41663 26.5001 4.41663ZM22.0834 37.5416L11.0417 26.5L14.1555 23.3862L22.0834 31.292L38.8447 14.5308L41.9584 17.6666L22.0834 37.5416Z"
        fill="#a0a0a0"
      />
    </Svg>
  );
};

export default UnTickBlackCircleIcon;
