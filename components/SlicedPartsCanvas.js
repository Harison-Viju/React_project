import React from 'react';

const SlicedPartsCanvas = ({ slicedParts }) => {
  return (
    <div>
      {slicedParts.map((canvas, index) => (
        <div key={index}>
          <canvas width={100} height={100} />
          {/* Render sliced images in a grid-like arrangement */}
        </div>
      ))}
    </div>
  );
};

export default SlicedPartsCanvas;
