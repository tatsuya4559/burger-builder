import React, { Component } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  handleSideDrawerToggle = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer};
    });
  };

  handleSideDrawerClosed = () => {
    this.setState({ showSideDrawer: false });
  };

  render() {
    return (
      <>
        <Toolbar onDrawerToggle={this.handleSideDrawerToggle} />
        <SideDrawer
          open={this.state.showSideDrawer}
          onClosed={this.handleSideDrawerClosed}
        />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </>
    );
  }
}

export default Layout;
