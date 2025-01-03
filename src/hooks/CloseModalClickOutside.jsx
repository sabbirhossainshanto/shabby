import { useEffect } from "react";

/* Close modal click outside function */
const CloseModalClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!ref?.current?.contains(e?.target)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref, callback]);
};

export default CloseModalClickOutside;
