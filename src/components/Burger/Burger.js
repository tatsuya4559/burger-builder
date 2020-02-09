import React from 'react';
import { withRouter } from 'react-router-dom';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const Burger = (props) => {
  let transformedIngredients = [];
  Object.entries(props.ingredients).forEach(([ingredient, amount]) => {
    for (let i = 0; i < amount; i++) {
      transformedIngredients.push(<BurgerIngredient key={ingredient + i} type={ingredient} />);
    }
  });

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default withRouter(Burger);
