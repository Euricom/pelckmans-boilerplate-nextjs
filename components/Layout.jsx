import React from 'react';
import Footer from './Footer';
import Navigation from './Navigation';

const Layout = ({ children }) => {
  return <>
    <Navigation></Navigation>
    <div>
      {children}
    </div>
    <Footer></Footer>
  </>
};

export default Layout;
