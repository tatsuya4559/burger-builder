import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const CheckoutSummary = (props) => {
  const style = {
    width: '100%',
    margin: 'auto',
  }

  return (
    <div className={classes.CheckoutSummary}>
      <h1>I hope it tastes well!!</h1>
      <div style={style}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button
        btnType="Danger"
        onClick={props.checkoutCanceled}>CANCEL</Button>
      <Button
        btnType="Success"
        onClick={props.checkoutContinued}>CONTINUE</Button>
    </div>
  );
};

export default CheckoutSummary;
