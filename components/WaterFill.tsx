export default function WaterFill() {
  return (
    <div className="flex justify-center items-center">
      <svg
        className="loading"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="100vw"
        height="50vh"
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
              fill="#4698D0"
              fillRule="nonzero"
              d="M0.25,1H0c0,0,0-0.659,0-0.916c0.083-0.303,0.158,0.334,0.25,0C0.25,0.327,0.25,1,0.25,1z"
            />
          </pattern>

          <image
            id="image"
            fillRule="nonzero"
            x="0"
            y="0"
            width="100%"
            height="100%"
            href="/images/Owwi.png"
          />
        </defs>

        <use
          x="0"
          y="0"
          xlinkHref="#image"
          opacity="1"
        />

        <rect
          className="animate-waveFillUp"
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
