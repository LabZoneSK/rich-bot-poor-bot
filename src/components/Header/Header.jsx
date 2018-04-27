import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="App-header">
    <Link className="h1-light not-decorated" to="/">Stop-loss</Link>
    <span className="white">v0.1</span>
  </header>
)

export default Header;