import React, { useState } from "react";
import { connect } from "react-redux";

import axios from "../../axios-orders";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { ADD_INGREDIENT, REMOVE_INGREDIENT } from "../../store/actions";

export const BurgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);

  const canPurchase = ingredients => {
    const sum = Object.values(ingredients).reduce((acc, curr) => acc + curr);
    return sum > 0;
  };

  const handleOrdered = () => {
    setPurchasing(true);
  };

  const handlePurchaseCanceled = () => {
    setPurchasing(false);
  };

  const handlePurchaseContined = () => {
    props.history.push("/checkout");
  };

  const disabledInfo = {
    ...props.ingredients
  };
  Object.entries(disabledInfo).forEach(([type, counts]) => {
    disabledInfo[type] = counts <= 0;
  });

  let orderSummary = null;
  let burger = <Spinner />;

  if (props.ingredients) {
    burger = (
      <>
        <Burger ingredients={props.ingredients} />
        <BuildControls
          onIngredientAdded={props.onIngredientAdded}
          onIngredientRemoved={props.onIngredientRemoved}
          disabled={disabledInfo}
          price={props.totalPrice}
          purchasable={canPurchase(props.ingredients)}
          onOrdered={handleOrdered}
        />
      </>
    );
    orderSummary = (
      <OrderSummary
        ingredients={props.ingredients}
        onPurchaseCanceled={handlePurchaseCanceled}
        onPurchaseContinued={handlePurchaseContined}
        price={props.totalPrice}
      />
    );
  }

  return (
    <>
      <Modal show={purchasing} onClosed={handlePurchaseCanceled}>
        {orderSummary}
      </Modal>
      {burger}
    </>
  );
};

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredientName => {
      dispatch({
        type: ADD_INGREDIENT,
        payload: { ingredientName: ingredientName }
      });
    },
    onIngredientRemoved: ingredientName => {
      dispatch({
        type: REMOVE_INGREDIENT,
        payload: { ingredientName: ingredientName }
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
