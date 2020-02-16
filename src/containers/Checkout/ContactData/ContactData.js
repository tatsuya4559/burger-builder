import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';

class ContactData extends React.Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'normal', displayValue: 'Normal'},
            {value: 'cheapest', displayValue: 'Cheapest'},
          ]
        },
        value: 'normal',
        validation: {},
        valid: true,
      },
    },
    loading: false,
    formIsValid: false,
  }

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid &= value.trim() !== '';
    }

    if (rules.minLength) {
      isValid &= value.trim().length >= rules.minLength;
    }

    if (rules.maxLength) {
      isValid &= value.trim().length <= rules.maxLength;
    }

    return isValid;
  }

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    Object.entries(this.state.orderForm).forEach(([key, value]) => {
      formData[key] = value.value;
    });

    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData
    };
    axios.post('/orders.json', order)
      .then(res => {
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(err => this.setState({ loading: false, }));
  }

  inputChangedHandler = (e, formElementIdentifier) => {
    // stringにしてからobjectに戻すことでdeep copyを実現する
    const updatedOrderForm = JSON.parse(JSON.stringify(this.state.orderForm));
    const updatedElement = updatedOrderForm[formElementIdentifier];
    updatedElement.value = e.target.value;
    updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation);
    updatedElement.touched = true;

    let formIsValid = true;
    Object.values(updatedOrderForm).forEach(el => {
      formIsValid &= el.valid;
    });
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid,
    });
  }

  render() {
    let formElements = [];
    Object.entries(this.state.orderForm).forEach(([key, value]) => {
      formElements.push(
        <Input
          key={key}
          elementType={value.elementType}
          elementConfig={value.elementConfig}
          value={value.value}
          invalid={!value.valid}
          shouldValidate={Boolean(value.validation && value.touched)}
          changed={(e) => this.inputChangedHandler(e, key)}
        />
      )
    });

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElements}
        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data.</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
};

export default connect(mapStateToProps)(withRouter(ContactData));
