import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function App() {
  const [src, selectFile] = useState(null);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    selectFile(URL.createObjectURL(e.target.files[0]));
    setResult(null);
  };

  const getCroppedImg = () => {
    if (!image) return;

    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const croppedImageUrl = canvas.toDataURL('image/jpeg');
    setResult(croppedImageUrl);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {src && (
            <div>
              <ReactCrop
                src={src}
                onImageLoaded={setImage}
                crop={crop}
                onChange={(newCrop) => setCrop(newCrop)}
              />
              <button className="btn btn-danger" onClick={getCroppedImg}>
                Crop Image
              </button>
            </div>
          )}
          {result && (
            <div>
              <img src={result} alt="Cropped Image" className="img-fluid" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
