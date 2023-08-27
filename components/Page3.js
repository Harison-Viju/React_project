import React from 'react';
import './FileUploader.css';
import { useNavigate } from 'react-router-dom';
import Final from './Final';
function Page3() {
    const navigate = useNavigate();

    const navigateToPage2 = () => {
      // 👇 navigate to /page2
      navigate('/page3');
    };
  return (
    <div>
      <Final />
      
    </div>
  );
}

export default Page3;
