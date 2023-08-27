import React, { useState } from 'react';
import AssemblyPads from './AssemblyPads';
import ImageSlice from './ImageSlice';
import PadForm from './PadForm';

function Final() {
  const [imageDimensions, setImageDimensions] = useState({ length: 0, breadth: 0 });

  const handleImageSlice = (length, breadth) => {
    setImageDimensions({ length, breadth });
  };

  return (
    <div className="pad-content">
      <div className="top-left">
        <ImageSlice onImageSlice={handleImageSlice} />
      </div>
      <div className="top-right">
        <PadForm length={imageDimensions.length} breadth={imageDimensions.breadth} />
      </div>
      <div className="bottom">
        <AssemblyPads />
      </div>
    </div>
  );
}

export default Final;
