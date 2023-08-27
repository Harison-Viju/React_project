import React, { useRef, useEffect, useState } from 'react';
import './ImageSlice.css';

const ImageSlice = ({ onImageSlice }) => {
  
   
  return (
    <div>
  
      <canvas
       
        className="image-slice-container"
        width={500} // Adjust the canvas width as needed
        height={500} // Adjust the canvas height as needed
        style={{ border: '1px solid black', backgroundColor: 'grey' }}
      ></canvas>
    </div>
  );
};

export default ImageSlice;
