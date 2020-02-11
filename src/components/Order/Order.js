import React from 'react';

import classes from './Order.module.css';

const Order = (props) => {
  let ingredients = [];
  Object.entries(props.ingredients).forEach(([ingredient, amount]) => {
    ingredients.push(
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: '0 8px',
          padding: '5px',
          border: '1px solid #ccc'
        }}
        key={ingredient}>{ingredient} ({amount})</span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredients}</p>
      <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
  );
};

export default Order;
