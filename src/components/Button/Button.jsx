import React from 'react';

import './Button.css';

const Button = ({ name, click }) => (
  <button 
    className="btn btn-w-md btn-accent"
    onClick={click} >
    <span>{ name }</span>
  </button>
)

export default Button;