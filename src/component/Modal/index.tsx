import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import style from "./index.module.scss";

const Portal: FC<{ children: ReactNode; className: string }> = ({
  children,
  className,
}) => {
  const el = React.useMemo(() => document.createElement("div"), []);

  useEffect(() => {
    const target = document.body;
    const classList = ["portal-container"];
    if (className) className.split(" ").forEach((item) => classList.push(item));
    classList.forEach((item) => el.classList.add(item));
    target.appendChild(el);
    return () => {
      target.removeChild(el);
    };
  }, [el, className]);

  return ReactDOM.createPortal(children, el);
};

export const Modal: FC<{ isOpen: boolean; children: ReactNode }> = ({
  isOpen,
  children,
}) => {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  const backdropRef = useRef<HTMLInputElement>(null);

  const closeModal = () => {
    dispatch({ type: "closeModal" });
  };

  useEffect(() => {
    const backdropEl = backdropRef.current;

    const transitionEnd = () => setActive(isOpen);

    const keyHandler = (e: KeyboardEvent) => {
      e.code === "Escape" && closeModal();
    };

    const clickHandler = (e: MouseEvent) => {
      e.target === backdropEl && closeModal();
    };

    if (backdropEl) {
      backdropEl.addEventListener("transitionend", transitionEnd);
      backdropEl.addEventListener("click", clickHandler);
      window.addEventListener("keyup", keyHandler);
    }

    if (isOpen) {
      window.setTimeout(() => {
        const activeEl = document.activeElement;
        const rootEl = document.querySelector("#root");
        setActive(isOpen);
        if (activeEl instanceof HTMLElement) {
          activeEl.blur();
        }
        if (rootEl instanceof HTMLElement) {
          rootEl.setAttribute("inert", "true");
        }
      }, 10);
    }

    return () => {
      if (backdropEl) {
        backdropEl.removeEventListener("transitionend", transitionEnd);
        backdropEl.removeEventListener("click", clickHandler);
      }

      const rootEl = document.querySelector("#root");
      if (rootEl instanceof HTMLElement) {
        rootEl.removeAttribute("inert");
      }

      window.removeEventListener("keyup", keyHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <React.Fragment>
      {(isOpen || active) && (
        <Portal className="modal-portal">
          <div
            ref={backdropRef}
            className={
              active && isOpen ? `${style.modal} ${style.active}` : style.modal
            }
          >
            <div className={`${style.content}`}>{children}</div>
          </div>
        </Portal>
      )}
    </React.Fragment>
  );
};
