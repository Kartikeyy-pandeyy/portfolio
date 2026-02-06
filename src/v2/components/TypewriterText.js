import React, { useEffect, useMemo, useRef, useState } from "react";

const TypewriterText = ({
  text,
  start,
  delayMs = 0,
  speedMs = 18,
  as = "p",
  className = "",
  onComplete,
}) => {
  const [value, setValue] = useState("");
  const safeText = useMemo(() => text || "", [text]);
  const onCompleteRef = useRef(onComplete);
  const completedRef = useRef(false);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!start) {
      setValue("");
      completedRef.current = false;
      return undefined;
    }

    let timeoutId;
    let intervalId;
    let i = 0;

    timeoutId = setTimeout(() => {
      if (!safeText.length) {
        if (!completedRef.current) {
          completedRef.current = true;
          onCompleteRef.current?.();
        }
        return;
      }

      intervalId = setInterval(() => {
        i += 1;
        setValue(safeText.slice(0, i));

        if (i >= safeText.length) {
          clearInterval(intervalId);
          if (!completedRef.current) {
            completedRef.current = true;
            onCompleteRef.current?.();
          }
        }
      }, speedMs);
    }, delayMs);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [delayMs, safeText, speedMs, start]);

  return React.createElement(as, { className }, value);
};

export default TypewriterText;
