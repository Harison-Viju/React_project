import React, { useState, useRef } from 'react';
import './FileUploader.css';





const FileUploader = () => {
  const [cid, setCid] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  

 

  const handleImageSelect = (event) => {
    setSelectedImage(event.target.value);
  };

  const handleImageSubmit = (event) => {
    event.preventDefault();
    // Load the selected image on the canvas
    fetchImage(selectedImage);
  };

  const canvasRef = useRef(null);

  
  const AssemblyPadsCanvas = () => {
    return (
      <div>
        <canvas ref={canvasRef} width={600} height={400} style={{border: '1px solid black', backgroundColor: 'green' }} />
        {/* Render assembly pads with sliced parts and grid lines */}
      </div>
    );
  };

  return (
    <div className="FileUploader">
      <form onSubmit={handleImageSubmit}>
        <label>
          CID
          <input type="text" value={cid} onChange={handleCidChange} placeholder="CID" />
        </label>
        <select value={selectedImage} onChange={handleImageSelect}>
          <option value="">Select an image</option>
          {images.map((image) => (
            <option key={image} value={image}>
              {image}
            </option>
          ))}
        </select>
        <button type="submit">Show Image</button>
      </form>
      
      <AssemblyPadsCanvas />
    </div>
  );
};

export default FileUploader;
