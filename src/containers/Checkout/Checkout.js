import React from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component {
  constructor(props) {
    super(props);

    const searchParams = new URLSearchParams(this.props.location.search);
    const ingredients = {
      salad: searchParams.get('salad'),
      meat: searchParams.get('meat'),
      cheese: searchParams.get('cheese'),
      bacon: searchParams.get('bacon'),
    };

    this.state = {
      ingredients: ingredients,
      totalPrice: searchParams.get('price'),
    };
  }

  componentDidMount() {
  }

  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCanceled={this.checkoutCanceledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={`${this.props.match.path}/contact-data`}
          render={() => (
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
            />)}
        />
      </div>
    );
  }
}

export default Checkout;
