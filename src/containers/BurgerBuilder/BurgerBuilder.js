import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT
} from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
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

  canPurchase = (ingredients) => {
    const sum = Object.values(ingredients)
      .reduce((acc, curr) => (acc + curr));
    return sum > 0;
  };

  handleOrdered = () => {
    this.setState({ purchasing: true });
  };

  handlePurchaseCanceled = () => {
    this.setState({ purchasing: false });
  };

  handlePurchaseContined = () => {
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients
    };
    Object.entries(disabledInfo).forEach(([type, counts]) => {
      disabledInfo[type] = counts <= 0;
    });

    let orderSummary = null;
    let burger = this.state.error ? <p>can't load ingredients</p> : <Spinner />;

    if (this.props.ingredients) {
      burger = (
        <>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            onIngredientAdded={this.props.onIngredientAdded}
            onIngredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.canPurchase(this.props.ingredients)}
            onOrdered={this.handleOrdered}
          />
        </>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          onPurchaseCanceled={this.handlePurchaseCanceled}
          onPurchaseContinued={this.handlePurchaseContined}
          price={this.props.totalPrice}
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

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredientName) => {
      dispatch({
        type: ADD_INGREDIENT,
        payload: {ingredientName: ingredientName}
      })
    },
    onIngredientRemoved: (ingredientName) => {
      dispatch({
        type: REMOVE_INGREDIENT,
        payload: {ingredientName: ingredientName}
      })
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
