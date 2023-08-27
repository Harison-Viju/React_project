import React,{ useState , useEffect} from 'react';
import logo from './Saint-Gobain_SEFPRO_logo_2023.png';
import './fileUpload.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Fileupload() {
 
  const [oaNumber, setOaNumber] = useState('');
  const [drawingNumber, setDrawingNumber] = useState('');
  const [drawingNumberOptions, setDrawingNumberOptions] = useState([]);
  const [top_view, setTopViewFile] = useState(null);
  const [side_view, setSideViewFile] = useState(null);
  const [front_view, setFrontViewFile] = useState(null);

  const navigate = useNavigate();

  const navigateToFileupload = () => {
    //  navigate 
    navigate('/fileUpload');
  };

  const navigateToPlanning = () => {
    navigate('/Planning');
  }

  const navigateToSlicing =() => {
    navigate('/slicing');
  }

  const navigateToBook = () => {
    navigate('/bookPage')
  }

 const handleOaNumberChange = (e) => {
    setOaNumber(e.target.value);
    setDrawingNumber(''); // Clear the selected drawing number
    setDrawingNumberOptions([]); // Clear the options
  };

  const handleDrawingNumberChange = (e) => {
    setDrawingNumber(e.target.value);
  };

  useEffect(() => {
    if (oaNumber) {
      fetch(`http://localhost:5000/api/product/${oaNumber}`)
        .then(response => response.json())
        .then(data => {
          console.log('API Response:', data);
          setDrawingNumber(data.drawing_number || '');
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [oaNumber]);

  useEffect(() => {
    if (drawingNumber) {
      setDrawingNumberOptions(prevOptions => [...prevOptions, drawingNumber]);
    }
  }, [drawingNumber]);

  const navigateToDashboard=() =>{
    navigate('/dashboard')
  }

  const handleSubmit = () => {
    const top_view = document.getElementById('top_view').files[0];
    const side_view = document.getElementById('side_view').files[0];
    const front_view = document.getElementById('front_view').files[0];
  
    const formData = new FormData();
    formData.append('top_view', top_view);
    formData.append('side_view', side_view);
    formData.append('front_view', front_view);
  
    axios
      .post(`http://localhost:5000/api/upload/${drawingNumber}`, formData)
      .then(() => {
        console.log('Data sent to server:');
        alert('Uploaded');
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

    const [showNav, setShowNav] = useState(false);
  
    const handleMouseEnter = () => {
      setShowNav(true);
    };
  
    const handleMouseLeave = () => {
      setShowNav(false);
    };
  

    return (
      
      <div className="Container">
        <div className="Header" style={{ display: 'flex' }}>
          <div className="pages">
            <img src={logo} alt="logo" style={{ width: '200px', height: '50px' }} />
          </div>
          <div className="pages">
            <p className='headerText' onClick={navigateToDashboard} >Home</p>
          </div>
          <div className="pages">
            <p className='home' onMouseEnter={handleMouseEnter}  style={{ color: 'hsl(180.3deg 100% 39.02%)' }}>New Plan </p>
            <div className ="nav"onMouseLeave={handleMouseLeave}  style={{ display: showNav ? 'block' : 'none' }}>
            <div  className="navbar"onClick={navigateToPlanning}>Plan</div>
            <div className="navbar"onClick ={navigateToFileupload}>File Upload</div>
            <div className="navbar"onClick={navigateToSlicing}>Slice</div>
            <div className="navbar"onClick={navigateToBook}>Book</div>
          </div>

          </div>
          
          <div className="pages">
            <p className='headerText'>Track Progress</p>
          </div>
          <div className="pages">
            <p className='headerText'>Users</p>
          </div>
          <div className="pages">
            <p className='headerText'>Customers</p>
          </div>
         
          <div className="logout" style={{ marginLeft: '15%' }}>
            Logout
          </div>
        </div>
        <div className='Plan' style={{marginTop:'3%'}}>
        <h1 style={{ textAlign: 'center' }}>FILE UPLOAD</h1>
       
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
    <button className ="slice" style={{ width: '10%' }}>Slice</button>
</div>

<div>
 
<div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' ,color:'white'}}>
<label>OA Number</label>
          <input
            type="text"
            placeholder="Enter OA Number"
            style={{ marginLeft: "2%" }}
            value={oaNumber}
            onChange={handleOaNumberChange}
          />
       <label style={{ marginLeft: '2%' }}>Drawing Number</label>
          <select value={drawingNumber} id="drawingNumber" onChange={handleDrawingNumberChange}>
            <option value="">Select Drawing Number</option>
            {drawingNumberOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div style={{textAlign:'center',marginTop:'18vh'}}>
      <div style={{ marginTop: '20px', color: 'white' }}>
        <label>Top View:</label>
        <input type="file" id="top_view"onChange={(e) => setTopViewFile(e.target.files[0])} />
      </div>
      
     <div style={{ marginTop: '20px', color: 'white' }}>
        <label>Side View:</label>
        <input type="file" id="side_view" onChange={(e) => setSideViewFile(e.target.files[0])} />
      </div>
      
   <div style={{ marginTop: '20px', color: 'white' }}>
        <label>Front View:</label>
        <input type="file" id="front_view" onChange={(e) => setFrontViewFile(e.target.files[0])} />
      </div>
     
      </div>

      <button onClick={handleSubmit}>Upload</button>
     
     

    </div>
  );
}

export default Fileupload;



