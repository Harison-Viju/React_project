import React, { useRef, useEffect, useState } from 'react';
import './Page2.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Page2() {
  // Navigation block
  const navigate = useNavigate();

  const navigateToPage3 = () => {
    // Navigate to /page3
    navigate('/page3');
  };
  // Navigation Block ends

  // Canvas1 block
  const canvasRef = useRef(null);
  const canvas2Ref = useRef(null);
  const canvas3Ref = useRef(null);

  const location = useLocation();

  const canvasWidth = 300; // Set your desired canvas width here
  const canvasHeight = 100; // Set your desired canvas height here

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    if (location.state && location.state.selectedImage) {
      const image = new Image();
      image.src = location.state.selectedImage;
      image.onload = () => {
        const aspectRatio = image.width / image.height;
        let newWidth = canvasWidth / 10;
        let newHeight = canvasHeight;

        if (aspectRatio > 1) {
          newHeight = canvasWidth / aspectRatio;
        } else {
          newWidth = canvasHeight * aspectRatio;
        }

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        const x = (canvasWidth - newWidth) / 2;
        const y = (canvasHeight - newHeight) / 2;

        ctx.drawImage(image, x, y, newWidth, newHeight);
      };
    }
  }, [location.state]);
  // Canvas1 block ends

  // Canvas block 2
  // Handle c1 canvas click
  const handleCanvas1Click = (e) => {
    const canvas2 = canvas2Ref.current;
    const ctx2 = canvas2.getContext('2d');

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const width = canvas2.width;
    const height = canvas2.height;

    const image = new Image();
    image.src = location.state.selectedImage;
    image.onload = () => {
      ctx2.clearRect(0, 0, width, height); // Clear previous content
      ctx2.drawImage(image, 0, 0, width, height);
    };
  };
  // Handling click ends here

  // All the slicing operations happen here
  const [isSnipping, setIsSnipping] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  // Handle c2 canvas mouse down
  const handleCanvas2MouseDown = (e) => {
    setIsSnipping(true);
    const canvas2 = canvas2Ref.current;
    const ctx2 = canvas2.getContext('2d');
  
    const rect = canvas2.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
  
    setStartX(mouseX);
    setStartY(mouseY);
    setImageDimensions({ width: canvas2.width, height: canvas2.height });
  };
  
  
  const handleCanvas2MouseMove = (e) => {
    if (isSnipping) {
      const canvas2 = canvas2Ref.current;
      const ctx2 = canvas2.getContext('2d');
      const x = startX;
      const y = startY;
      const width = Math.abs(e.nativeEvent.offsetX - startX);
      const height = Math.abs(e.nativeEvent.offsetY - startY);
  
      // Clear the previous clipping rectangle
      ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  
      // Draw the original image from canvas c1
      const image = new Image();
      image.src = location.state.selectedImage;
 
        ctx2.drawImage(image, 0, 0, canvas2.width, canvas2.height);
        
        // Set the line style for a dashed/dotted line
        ctx2.setLineDash([3, 3]); // Change the values to adjust the dash length and gap
  
        // Draw the dashed/dotted line rectangle
        ctx2.strokeStyle = 'black';
        ctx2.lineWidth = 1;
        ctx2.strokeRect(x, y, width, height);
  
        // Reset the line style to solid
        ctx2.setLineDash([]);

    }
  };
  


  const [slicedImages, setSlicedImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleCanvas2MouseUp = (e) => {
    setIsSnipping(false);
    const canvas2 = canvas2Ref.current;
    const ctx2 = canvas2.getContext('2d');
    const canvas3 = canvas3Ref.current;
    const ctx3 = canvas3.getContext('2d');

    const x = startX;
    const y = startY;
    const width = Math.abs(e.nativeEvent.offsetX - startX);
    const height = Math.abs(e.nativeEvent.offsetY - startY);

    // Store the sliced area as an object in the slicedImages array
    setSlicedImages([...slicedImages, { x, y, width, height }]);
    setSelectedImageIndex(null); // Reset selected image index

    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);

    // Calculate the total height needed to display all sliced images in Canvas C3
    let totalHeight = 0;
    for (const slice of slicedImages) {
      totalHeight += slice.height;
    }
    canvas3.height = totalHeight;

    // Draw all sliced images onto Canvas C3 with spacing and shrinkage
    let yOffset = 0;
    for (let i = 0; i < slicedImages.length; i++) {
      const slice = slicedImages[i];
      ctx3.drawImage(
        canvas2,
        slice.x,
        slice.y,
        slice.width,
        slice.height,
        0,
        yOffset,
        imageDimensions.width,
        slice.height
      );
      ctx3.fillText(`Clip ${i + 1}`, 10, yOffset + 20); // Display clip name
      
      
      yOffset += slice.height;
    }
  };

  const handleCanvas3Click = (index) => {
    const isConfirmed = window.confirm("Do you want to delete this clipped image?");
  
    if (isConfirmed) {
      handleDeleteClip(index);
    }
  };
  
  
  const handleDeleteClip = (index) => {
    console.log("handleDeleteClip called with index:", index);
    const newSlicedImages = slicedImages.filter((_, i) => i !== index);
    setSlicedImages(newSlicedImages);
    
    // Get the canvas3 reference and its 2D context
    const canvas3 = canvas3Ref.current;
    const ctx3 = canvas3.getContext('2d');
  
    // Clear canvas3
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
  
    // Redraw the remaining sliced images on canvas3
    let yOffset = 0;
    for (let i = 0; i < newSlicedImages.length; i++) {
      const slice = newSlicedImages[i];
      ctx3.drawImage(
        canvas2Ref.current,
        slice.x,
        slice.y,
        slice.width,
        slice.height,
        0,
        yOffset,
        imageDimensions.width,
        slice.height
      );
      ctx3.fillText(`Clip ${i + 1}`, 10, yOffset + 20); // Display clip name
      yOffset += slice.height;
    }
  };
  

  
  // Slicing ends

  return (
    <div className="container">
      <canvas
        className='c1'
        ref={canvasRef}
        width={300} // Set your desired canvas width here
        height={100} // Set your desired canvas height here
        onClick={handleCanvas1Click} // Add click event handler
        style={{ border: '1px solid black', backgroundColor: 'grey' }}
      />
    <div className='bottom-canvases'>
  <canvas
    className='c2'
    ref={canvas2Ref}
    width={canvasWidth} // Explicitly set width
    height={canvasHeight} // Explicitly set height
    onMouseDown={handleCanvas2MouseDown}
    onMouseMove={handleCanvas2MouseMove}
    onMouseUp={handleCanvas2MouseUp}
    style={{ border: '1px dotted black', backgroundColor: 'grey', cursor: 'crosshair' }}
  />
  <div className='c3-container'>
    <canvas
      className='c3'
      ref={canvas3Ref}
       width={canvasWidth} // Explicitly set width
          height={canvasHeight} // Explicitly set height
      style={{ border: '1px solid black', backgroundColor: 'grey' }}
    />
    {slicedImages.map((slice, index,) => (
      <div
        key={index}
        className='clip-container'
        style={{
        top: `${(index * 60)+100}px`,
        right: 0,
        width: 50,
        height: 50,
        }}
        onClick={() => handleCanvas3Click(index)}
      >
        <p className='clip-text'>Delete Clip {index + 1}</p>
      </div>
    ))}
  </div>
</div>


      <button type="submit" class="learn-more" onClick={navigateToPage3}>
        <span class="circle" aria-hidden="true">
        <span class="icon arrow"></span>
        </span>
        <span class="button-text"> continue</span>
      </button>
    </div>
  );
}

export default Page2;
