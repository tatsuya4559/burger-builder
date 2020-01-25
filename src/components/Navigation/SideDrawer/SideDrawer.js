import React, { Component } from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'

class SideDrawer extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.open !== nextProps.open;
  }

  render() {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (this.props.open) {
      attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
      <>
        <Backdrop show={this.props.open} onClosed={this.props.onClosed} />
        <div className={attachedClasses.join(' ')}>
          <div className={classes.Logo}>
            <Logo />
          </div>
          <nav>
            <NavigationItems />
          </nav>
        </div>
      </>
    );
  }
};

export default SideDrawer;
