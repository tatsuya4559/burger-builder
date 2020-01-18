import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const Burger = (props) => {
  // let transformedIngredients = Object.keys(props.ingredients)
  //   .map(key => {
  //     return [...Array(props.ingredients[key])].map((_, i) => (
  //       <BurgerIngredient key={key + i} type={key} />
  //     ));
  //   })
  //   .reduce((acc, e) => {
  //     return acc.concat(e)
  //   }, []);

  // mapしてreduceするより一周でflattenまでしたほうがいいかも？
  // このほうがわかりやすいが、pythonは更にシンプルになった！
  let transformedIngredients = [];
  Object.entries(props.ingredients).forEach(([ingrediennt, amount]) => {
    for (let i = 0; i < amount; i++) {
      transformedIngredients.push(<BurgerIngredient key={ingrediennt + i} type={ingrediennt} />);
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

export default Burger;
