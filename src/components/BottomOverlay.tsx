import { ReactElement } from 'react';

export const BottomOverlay = (): ReactElement => {
  return (
    <svg
      className="waves"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 150 28"
      preserveAspectRatio="none"
      shapeRendering="auto"
    >
      <defs>
        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
      </defs>
      <g className="parallax">
        <use xlinkHref="#gentle-wave" x="48" y="0" fill="#20DF7F" fillOpacity="0.09"/>
        <use xlinkHref="#gentle-wave" x="48" y="3" fill="#E5E5E5" fillOpacity="0.13"/>
        {/*<use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)"/>*/}
        {/*<use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff"/>*/}
      </g>
    </svg>
  );
};
