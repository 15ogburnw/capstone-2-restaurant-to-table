import { useCallback, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = ({ onClose, children, title }) => {
  // create ref for the StyledModalWrapper component
  const modalWrapperRef = useRef();

  // check if the user has clicked inside or outside the modal
  // useCallback is used to store the function reference, so that on modal closure, the correct callback can be cleaned in window.removeEventListener
  const backDropHandler = useCallback(
    (e) => {
      if (!modalWrapperRef?.current?.contains(e.target)) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    // We wrap it inside setTimeout in order to prevent the eventListener to be attached before the modal is open.
    setTimeout(() => {
      window.addEventListener("click", backDropHandler);
    });
  }, [backDropHandler]);

  useEffect(() => {
    // remove the event listener when the modal is closed
    return () => window.removeEventListener("click", backDropHandler);
  }, [backDropHandler]);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = (
    <div className="absolute h-screen w-screen top-0 left-0  flex justify-center items-center align-middle">
      {/* Wrap the whole Modal inside the newly created StyledModalWrapper
            and use the ref */}
      <div ref={modalWrapperRef} className="w-[60vw]">
        <div className=" bg-white shadow-xl shadow-primary-800/40 w-full border-2 border-primary-600 p-7 rounded-2xl">
          <div className="text-xl font-bold text-primary-700 flex justify-between">
            <div className="invisible"></div>
            {title && (
              <h1 className="text-primary-700 font-bold text-2xl capitalize">
                {title}
              </h1>
            )}
            <a href="#" onClick={handleCloseClick}>
              x
            </a>
          </div>

          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.getElementById("modal-root"));
};

export default Modal;
