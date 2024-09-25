import React from "react";
import ".//Error.scss";

const Error = () => {
  return (
    <div className="container_error">
      Данные не были получены.
      <br />
      Перезагрузите страницу или попробуйте позже
    </div>
  );
};

export default Error;
