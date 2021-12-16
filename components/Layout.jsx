import React from 'react';
import Navigation from './Navigation';

const Layout = ({ children }) => {
  return <>
    <Navigation/>
    <div>
      {children}
    </div>
  </>
};

export default Layout;
