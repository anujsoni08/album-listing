import React from "react";

import loadingGIF from "../../../assets/loadingGIF.gif";

function Loading() {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <img src={loadingGIF} alt={"loading"} />
    </div>
  );
}

export default Loading;
