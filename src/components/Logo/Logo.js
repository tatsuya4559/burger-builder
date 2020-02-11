import React from 'react';
import { withRouter } from 'react-router-dom';
import burgerLogo from '../../assets/image/burger-logo.png';
import classes from './Logo.module.css';

const Logo = (props) => {
  const handleClicked = () => {
    props.history.push('/');
  }

  return (
    <div className={classes.Logo} style={{height: props.height}}>
      <img onClick={handleClicked} src={burgerLogo} alt="MyBurger" />
    </div>
  );
};

export default withRouter(Logo);
