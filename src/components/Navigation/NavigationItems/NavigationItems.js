import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'

const NavigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem href="/" exact>Burger Builder</NavigationItem>
    <NavigationItem href="/orders">Orders</NavigationItem>
  </ul>
);

export default NavigationItems;
