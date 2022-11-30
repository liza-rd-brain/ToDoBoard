import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import style from "./index.module.scss";

function Portal({ children, parent, className }) {
  const el = React.useMemo(() => document.createElement("div"), []);

  React.useEffect(() => {
    const target = parent && parent.appendChild ? parent : document.body;
    const classList = ["portal-container"];
    if (className) className.split(" ").forEach((item) => classList.push(item));
    classList.forEach((item) => el.classList.add(item));
    target.appendChild(el);
    return () => {
      target.removeChild(el);
    };
  }, [el, parent, className]);

  return ReactDOM.createPortal(children, el);
}

export default function Modal(props) {
  const [active, setActive] = React.useState(false);
  const dispatch = useDispatch();
  const { open, onClose, locked } = props;
  const backdrop = React.useRef(null);

  const closeModal = () => {
    dispatch({ type: "closeModal" });
  };

  useEffect(() => {
    const { current } = backdrop;

    const transitionEnd = () => setActive(open);

    const keyHandler = (e) =>
      !locked && [27].indexOf(e.which) >= 0 && closeModal();

    const clickHandler = (e) => !locked && e.target === current && closeModal();

    if (current) {
      current.addEventListener("transitionend", transitionEnd);
      current.addEventListener("click", clickHandler);
      window.addEventListener("keyup", keyHandler);
    }

    if (open) {
      window.setTimeout(() => {
        document.activeElement.blur();
        setActive(open);
        document.querySelector("#root").setAttribute("inert", "true");
      }, 10);
    }

    return () => {
      if (current) {
        current.removeEventListener("transitionend", transitionEnd);
        current.removeEventListener("click", clickHandler);
      }

      document.querySelector("#root").removeAttribute("inert");
      window.removeEventListener("keyup", keyHandler);
    };
  }, [open, locked, closeModal]);

  return (
    <React.Fragment>
      {(open || active) && (
        <Portal className="modal-portal">
          <div
            ref={backdrop}
            className={
              active && open ? `${style.modal} ${style.active}` : style.modal
            }
          >
            <div className={`${style.content}`}>{props.children}</div>
          </div>
        </Portal>
      )}
    </React.Fragment>
  );
}
