import React from 'react';
import { Nav } from './Nav';

export const Header = () => {
  return (
    <div>
      <div className="Bar">
        <a href="">Sick Fits</a>
        <Nav />
      </div>
      <div className="sub-bar">Search</div>
      <div>Cart</div>
    </div>
  );
};
