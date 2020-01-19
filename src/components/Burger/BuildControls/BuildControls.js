import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
  { lable: 'Salad', type: 'salad' },
  { lable: 'Bacon', type: 'bacon' },
  { lable: 'Cheese', type: 'cheese' },
  { lable: 'Meat', type: 'meat' }
];

const BuildControls = (props) => {

  return (
    <div className={classes.BuildControls}>
      <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.lable}
          label={ctrl.lable}
          added={() => props.onIngredientAdded(ctrl.type)}
          removed={() => props.onIngredientRemoved(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.onOrdered}>ORDER NOW</button>
    </div>
  );
};

export default BuildControls;
