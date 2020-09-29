import React from "react";

import loadingGIF from "../../../assets/loadingGIF.gif";

const Loading = () => {
  return (
    <div               
      style={{        // style to center the spinner
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <img src={loadingGIF} alt={"loading"} />
    </div>
  );
};

export default Loading;
