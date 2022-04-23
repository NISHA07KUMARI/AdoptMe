import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

//creating modal

const modalRoot = document.getElementById("modal");

const Modal = ({ children }) => {
  const elRef = useRef(null);

  /*If we tried to count how many times our application renders using the useState Hook, 
  we would be caught in an infinite loop since this Hook itself causes a re-render.
    To avoid this, we can use the useRef Hook.*/

  //rendering the div oly once -->
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    modalRoot.appendChild(elRef.current); // whenever you created, insert it into the dom.
    return () => modalRoot.removeChild(elRef.current); //Whenever you are done, remove me from the dom. Prevents memory leaks.
  }, []); // doing only once.

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
