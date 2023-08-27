import React from 'react';
import Background from './background';

function Layout({ children }) {
  return (
    <Background>
        <div className="content">
        {children}
        </div>
      </Background>
  );
};

export default Layout;
