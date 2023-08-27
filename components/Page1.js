import React, { useState, useRef, useEffect } from 'react';
import './FileUploader.css';
import { useNavigate } from 'react-router-dom';

function Page1() {
  const navigate = useNavigate();

  const navigateToPage2 = () => {
    //  navigate to /page2
    navigate('/page2', { state: { selectedImage } });
  };
  //code block1 -> for handling image input and putting it in canvas
  const [selectedImage, setSelectedImage] = useState(null);
  const canvasRef = useRef(null);

  const handleImageInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (canvasRef.current && selectedImage) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const image = new Image();
      image.src = selectedImage;
      image.onload = () => {
        canvas.width = 600; // Set your desired canvas width here
        canvas.height = 400; // Set your desired canvas height here
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      };
    }
  }, [selectedImage]);
  //code block1 ends
  const AssemblyPadsCanvas = () => {
    return (
      <div>
        <canvas ref={canvasRef} width={600} height={400} style={{  border: '1px solid black',backgroundColor: 'grey' }} />
        {/* Render assembly pads with sliced parts and grid lines */}
      </div>
    );
  };

  return (
  
    <div className="FileUploader">
      <form>
      <div className="wave-group">
        <input required type="text" className="input" />
        <span className="bar"></span>
        <label className="label">
          <span className="label-char" style={{ "--index": 0 }}>C</span>
          <span className="label-char" style={{ "--index": 1 }}>I</span>
          <span className="label-char" style={{ "--index": 2 }}>D</span>
        
        </label>
      </div>
        <select>
          <option value="">Select an image</option>
        </select>
      </form>
      <input type="file" accept="image/*" onChange={handleImageInputChange} />
      <AssemblyPadsCanvas />
      <button type="submit" class="learn-more" onClick={navigateToPage2}>
        <span class="circle" aria-hidden="true">
        <span class="icon arrow"></span>
        </span>
        <span class="button-text"> continue</span>
      </button>
      
    </div>
  );
}

export default Page1;
