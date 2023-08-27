import React ,{useState,useEffect} from 'react';
import logo from './Saint-Gobain_SEFPRO_logo_2023.png';
import './slicing.css';
import { useNavigate } from 'react-router-dom';


function Slicing() {
  const [oaNumber, setOaNumber] = useState('');
  const [drawingNumber, setDrawingNumber] = useState('');
  const [drawingNumberOptions, setDrawingNumberOptions] = useState([]);
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

  const navigateToDashboard=() =>{
    navigate('/dashboard')
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
            <p className='headerText' onClick={navigateToDashboard}>Home</p>
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
      <div className="preview" style={{width:'100%',height:'8vh',backgroundColor:'white',marginTop:'4%'}}>
      </div>
        <div style={{display:'flex',marginTop:'10px'}}>
        <div style={{width:'60%',height:'60vh',backgroundColor:'white'}}>

      </div>
      <div style={{width:'30%',height:'60vh',backgroundColor:'white',marginLeft:'8%'}}>

      </div>
        </div>
      

       
      </div>
      
      

            
               
 );
}
          
export default Slicing;