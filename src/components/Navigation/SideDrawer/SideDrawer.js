import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

const SideDrawer = React.memo(
  props => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
      attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
      <>
        <Backdrop show={props.open} onClosed={props.onClosed} />
        <div className={attachedClasses.join(" ")}>
          <div className={classes.Logo}>
            <Logo />
          </div>
          <nav>
            <NavigationItems />
          </nav>
        </div>
      </>
    );
  },
  (prevProps, nextProps) => prevProps.open === nextProps.open
);

export default SideDrawer;
