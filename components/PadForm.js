import React, { useState } from 'react';
import './PadForm.css';
const PadForm = ({ length, breadth }) => {
  const [lengthValue, setLengthValue] = useState(length);
  const [breadthValue, setBreadthValue] = useState(breadth);

  const handleLengthChange = (e) => {
    setLengthValue(e.target.value);
  };

  const handleBreadthChange = (e) => {
    setBreadthValue(e.target.value);
  };
  return (
    <div className="pad-form">
      <div className="form-row">
        <label htmlFor="length">Length (mm)</label>
        <input type="number" id="length"  value={lengthValue}
        onChange={handleLengthChange} />
      </div>

      <div className="form-row">
        <label htmlFor="addl-length">AddL. Length (mm)</label>
        <input type="number" id="addl-length" />
      </div>

      <div className="form-row">
        <label htmlFor="breadth">Breadth (mm)</label>
        <input type="number" id="breadth"  value={breadthValue}
        onChange={handleBreadthChange} />
      </div>

      <div className="form-row">
        <label htmlFor="addl-breadth">Addl. Breadth (mm)</label>
        <input type="number" id="addl-breadth" />
      </div>
      <div className="form-row">
        <label htmlFor="footprint">Footprint Area</label>
        <input type="number" id="footprint" />
      </div>
      <div className="form-row">
        <label htmlFor="walk-around">Walk Around (mm)</label>
        <input type="number" id="walk-around" />
      </div>
      <div className="form-row" >
        <label htmlFor="occupied-area">Occupied Area</label>
        <input type="number" id="occupied-area" />
      </div>
    </div>
  );
};

export default PadForm;
