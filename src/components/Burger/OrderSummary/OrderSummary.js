import React from 'react';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {

  const ingredientSummary = Object.entries(props.ingredients)
    .map(([key, value]) => (
      <li key={key}>
        <span style={{ textTransform: 'capitalize' }}>{key}</span>: {value}
      </li>
    ));

  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" onClick={props.onPurchaseCanceled}>CANCEL</Button>
      <Button btnType="Success" onClick={props.onPurchaseContinued}>CONTINUE</Button>
    </>
  );
};

export default OrderSummary;
