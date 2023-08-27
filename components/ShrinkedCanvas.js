import React, { useEffect, useRef } from 'react';

const ShrinkedCanvas = ({ images }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Loop through 'images' and draw them on the canvas with smaller size
    images.forEach((imagePath, index) => {
      const img = new Image();
      img.src = imagePath;
      const xPos = (index % 4) * 100; // Adjust the positioning based on the desired layout
      const yPos = Math.floor(index / 4) * 100;
      ctx.drawImage(img, xPos, yPos, 100, 100); // Draw images in a 100x100 region
    });
  }, [images]);

  return <canvas ref={canvasRef} width={400} height={400} />;
};

export default ShrinkedCanvas;
