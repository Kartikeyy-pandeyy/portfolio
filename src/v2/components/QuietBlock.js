import React from "react";

const QuietBlock = ({ children, className = "" }) => {
  return <section className={`quiet-block ${className}`.trim()}>{children}</section>;
};

export default QuietBlock;
