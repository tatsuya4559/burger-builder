import React, { Component } from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  };

  updatePurchasableState = (ingredients) => {
    const sum = Object.values(ingredients)
      .reduce((acc, curr) => (acc + curr));
    this.setState({ purchasable: sum > 0 });
  };

  handleIngredientAdded = (type) => {
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = this.state.ingredients[type] + 1;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
    this.updatePurchasableState(updatedIngredients);
  };

  handleIngredientRemoved = (type) => {
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = this.state.ingredients[type] - 1;

    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
    this.updatePurchasableState(updatedIngredients);
  };

  handleOrdered = () => {
    this.setState({ purchasing: true });
  }

  handlePurchaseCanceled = () => {
    this.setState({ purchasing: false });
  }

  handlePurchaseContined = () => {
    alert('You continued!')
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    Object.entries(disabledInfo).forEach(([type, counts]) => {
      disabledInfo[type] = counts <= 0;
    });

    return (
      <>
        <Modal show={this.state.purchasing} onClosed={this.handlePurchaseCanceled}>
          <OrderSummary
            ingredients={this.state.ingredients}
            onPurchaseCanceled={this.handlePurchaseCanceled}
            onPurchaseContinued={this.handlePurchaseContined}
            price={this.state.totalPrice}
          />
        </Modal>
        <div><Burger ingredients={this.state.ingredients} /></div>
        <BuildControls
          onIngredientAdded={this.handleIngredientAdded}
          onIngredientRemoved={this.handleIngredientRemoved}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          onOrdered={this.handleOrdered}
        />
      </>
    );
  }
}

export default BurgerBuilder;
