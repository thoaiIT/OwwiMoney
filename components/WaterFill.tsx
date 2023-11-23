export default function WaterFill() {
  return (
    <div className="flex justify-center items-center h-screen">
      <svg
        className="loading"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width=""
        height=""
        viewBox="0 0 574.558 120"
        enableBackground="new 0 0 574.558 120"
        xmlSpace="preserve"
      >
        <defs>
          <pattern
            id="water"
            width=".25"
            height="1.1"
            patternContentUnits="objectBoundingBox"
          >
            <path
              // fill="#000"
              fill="#f8f7f7"
              d="M0.25,1H0c0,0,0-0.659,0-0.916c0.083-0.303,0.158,0.334,0.25,0C0.25,0.327,0.25,1,0.25,1z"
            />
          </pattern>

          {/* <text id="text" transform="matrix(1 0 0 1 -8.0684 116.7852)" fontFamily="'Cabin Condensed'" fontSize="161.047">
        LOADING
      </text> */}

          <mask id="image_mask">
            <use
              x="0"
              y="0"
              xlinkHref="#image"
              opacity="1"
              //fill="#000000"
            />
          </mask>
        </defs>
        <image
          id="image"
          fillRule="nonzero"
          x="0"
          y="0"
          width="100%"
          height="100%"
          href="/images/Owwi.png"

          // xlinkHref="/images/Owwi.png"
        />
        <rect
          className="animate-waveFillUp"
          mask="url(#image_mask)"
          fill="url(#water)"
          x="-400"
          y="0"
          width="1600"
          height="120"
        />
      </svg>
    </div>
  );
}
