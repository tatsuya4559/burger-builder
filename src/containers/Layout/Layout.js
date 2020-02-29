import React, { useState } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const handleSideDrawerToggle = () => {
    setShowSideDrawer(prevShowSideDrawer => !prevShowSideDrawer);
  };

  const handleSideDrawerClosed = () => {
    setShowSideDrawer(false);
  };

  return (
    <>
      <Toolbar onDrawerToggle={handleSideDrawerToggle} />
      <SideDrawer open={showSideDrawer} onClosed={handleSideDrawerClosed} />
      <main className={classes.Content}>{props.children}</main>
    </>
  );
};

export default Layout;
