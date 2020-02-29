import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const Modal = React.memo(
  props => {
    return (
      <>
        <Backdrop show={props.show} onClosed={props.onClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: props.show ? "1" : "0"
          }}
        >
          {props.children}
        </div>
      </>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.show === nextProps.show &&
      prevProps.children === nextProps.children
    );
  }
);

export default Modal;
