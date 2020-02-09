import React, { Component } from 'react';
import axios from '../../axios-orders';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: null
  };

  componentDidMount() {
    axios.get('https://react-my-burger-369a5.firebaseio.com/ingredients.json')
      .then(res => {
        this.setState({ ingredients: res.data });
      })
      .catch(err => {
        this.setState({ error: true });
      });
  }

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
  };

  handlePurchaseCanceled = () => {
    this.setState({ purchasing: false });
  };

  handlePurchaseContined = () => {
    const queryParams = [];
    Object.entries(this.state.ingredients).forEach(([type, amount]) => {
      queryParams.push(`${encodeURIComponent(type)}=${encodeURIComponent(amount)}`);
    });
    queryParams.push(`price=${this.state.totalPrice}`);
    const queryString = '?' + queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: queryString,
    });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    Object.entries(disabledInfo).forEach(([type, counts]) => {
      disabledInfo[type] = counts <= 0;
    });

    let orderSummary = null;
    let burger = this.state.error ? <p>can't load ingredients</p> : <Spinner />;

    if (this.state.ingredients) {
      burger = (
        <>
          <Burger ingredients={this.state.ingredients} />
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
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          onPurchaseCanceled={this.handlePurchaseCanceled}
          onPurchaseContinued={this.handlePurchaseContined}
          price={this.state.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <>
        <Modal show={this.state.purchasing} onClosed={this.handlePurchaseCanceled}>
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
