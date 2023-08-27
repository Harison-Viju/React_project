import React from 'react';
import "./Background.css";

function Background({ children }) {
  return (
    <div className="body">
      <div className="graddiv">
        <div className="innerdiv">
          {children}
          
        </div>
      </div>
    </div>
  );
};

export default Background;
