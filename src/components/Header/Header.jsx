import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="App-header">
    <Link className="h1-light not-decorated" to="/">Rich Bot, Poor Bot</Link><br/>
    <small className="white">MVP</small>
  </header>
)

export default Header;