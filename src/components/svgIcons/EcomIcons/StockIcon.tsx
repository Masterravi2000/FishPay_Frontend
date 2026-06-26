import React from "react";
import Svg, { Path } from "react-native-svg";

const StockIcon = ({ color, fw }: { color?: string; fw?: string }) => {
  return (
    <Svg
      width="16"
      height="16"
      viewBox="0 0 48 48"
      fill="none"
      strokeWidth={4}
      stroke={'#8cdd66'}
    >
      <Path
        d="M6 15.066L22.538 6.50605C23.074 6.23005 23.342 6.09005 23.622 6.03605C23.8717 5.98798 24.1283 5.98798 24.378 6.03605C24.66 6.09005 24.926 6.23005 25.46 6.50605L42 15.066V30.722C42 31.434 42 31.788 41.892 32.106C41.7981 32.3849 41.6437 32.6397 41.44 32.852C41.21 33.094 40.894 33.256 40.262 33.584L24 42L7.738 33.584C7.106 33.256 6.79 33.094 6.56 32.852C6.35628 32.6397 6.20195 32.3849 6.108 32.106C6 31.788 6 31.432 6 30.718V15.066ZM24 42V23.874M42 15.066L24 23.874M6 15.066L24 23.874"
        stroke="#8cdd66"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default StockIcon;
