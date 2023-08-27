import React, { useRef, useEffect, useState } from 'react';
import './AssemblyPads.css';

function AssemblyPads() {
  const canvasRef = useRef(null);
  const [selectedPad, setSelectedPad] = useState('');
  const [padsData, setPadsData] = useState([
    { id: 'pad1', rows: 14, columns: 14 },
    { id: 'pad2', rows: 14, columns: 14 },
  ]);
  const gridSize = 30; // Size of each grid unit in pixels

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas background color
    context.fillStyle = 'green';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    const selectedPadData = padsData.find(pad => pad.id === selectedPad);

    if (selectedPadData) {
      // Calculate the canvas size based on grid dimensions and unit size
      const canvasWidth = selectedPadData.columns * gridSize;
      const canvasHeight = selectedPadData.rows * gridSize;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      // Draw assembly pad
      context.fillStyle = '#ddd';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines
      context.strokeStyle = 'rgba(0, 0, 0, 0.1)';

      for (let x = 0; x <= canvas.width; x += gridSize) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, canvas.height);
        context.stroke();
      }

      for (let y = 0; y <= canvas.height; y += gridSize) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(canvas.width, y);
        context.stroke();
      }
    }
  }, [selectedPad, padsData]);

  const handlePadChange = (event) => {
    setSelectedPad(event.target.value);
  };

  return (
    <div>
      <div className="input-container">
        <label htmlFor="pad">Select Assembly Pad:</label>
        <select id="pad" value={selectedPad} onChange={handlePadChange}>
          <option value="">Select Pad</option>
          {padsData.map(pad => (
            <option key={pad.id} value={pad.id}>{pad.id}</option>
          ))}
        </select>
      </div>
      <canvas
        ref={canvasRef}
        className="canvas"
      />
    </div>
  );
}

export default AssemblyPads;
