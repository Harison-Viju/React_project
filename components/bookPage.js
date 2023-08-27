import React ,{useState,useEffect} from 'react';
import logo from './Saint-Gobain_SEFPRO_logo_2023.png';
import './bookPage.css';
import { useNavigate } from 'react-router-dom';


function Book(){

    const [isHovered, setIsHovered] = useState(false);
    const [oaNumber, setOaNumber] = useState('');
  const [drawingNumber, setDrawingNumber] = useState('');
  const [drawingNumberOptions, setDrawingNumberOptions] = useState([]);
  const [slicedPartsData, setSlicedPartsData] = useState([]);
  const [selectedSliceLength, setSelectedSliceLength] = useState('');
const [selectedSliceBreadth, setSelectedSliceBreadth] = useState('');
const [additionalLength, setAdditionalLength] = useState('');
const [additionalBreadth, setAdditionalBreadth] = useState('');
const [walkAroundDistance, setWalkAroundDistance] = useState('');
const [footprintArea, setFootprintArea] = useState('');
const [occupiedArea, setOccupiedArea] = useState('');
const [plants,setPlants] = useState([]);


  const handleAreaHover = () => {
    setIsHovered(true);
  };

  const handleAreaLeave = () => {
    setIsHovered(false);
  };

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
    const selectedDrawingNumber = e.target.value;
    setDrawingNumber(selectedDrawingNumber);
  };
  
  useEffect(() => {
    if (oaNumber) {
      fetch(`http://localhost:5000/api/product/${oaNumber}`)
        .then(response => response.json())
        .then(data => {
          console.log('API Response:', data);
          setDrawingNumberOptions(data); // Update the drawingNumberOptions state
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

  const handleSliceDivClick = (slice) => {
    setSelectedSliceLength(slice.length);
    setSelectedSliceBreadth(slice.breadth);
  };
  

  useEffect(() => {
    fetch(`http://localhost:5000/api/slicedparts/${drawingNumber}`)
      .then(response => response.json())
      .then(data => {
        console.log('Sliced Parts Data:', data);
        setSlicedPartsData(data);
      })
      .catch(error => {
        console.error('Error fetching sliced parts data:', error);
      });
  }, [drawingNumber]);

  const handleSubmit = () => {
    // Make API call to insert data into the database
    fetch(`http://localhost:5000/api/slicedparts/${drawingNumber}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        additionalLength,
        additionalBreadth,
        walkAroundDistance,
      }),
    })
      .then(response => response.json())
      .then(data => {
        // Set the response data to states
        setFootprintArea(data.footprint_area);
        setOccupiedArea(data.occupied_area);
  
        console.log('Updated Data:', data);
      })
      .catch(error => {
        console.error('Error inserting or fetching data:', error);
      });
  };

  useEffect(() => {
    console.log("Fetching plants data...");
    fetch(`http://localhost:5000/api/plants`)
    .then(response => response.json())
    .then(data => {
        console.log('Plants Data:', data);
        setPlants(data);
    })
    .catch(error => {
        console.error('Error fetching sliced parts data:', error);
    });
}, []);



const [showNav, setShowNav] = useState(false);
  
const handleMouseEnter = () => {
  setShowNav(true);
};

const handleMouseLeave = () => {
  setShowNav(false);
};

  
    return(
        <div style={{padding:'8px'}}>
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
    <option key={index} value={option.drawing_number}>
      {option.drawing_number}
    </option>
  ))}
</select>



        </div>
          <div className='slicedparts' style={{display:'flex',marginTop:'3vh'}}>
            <div style={{width:'80%',height:'40vh',backgroundColor:'white'}}>
            <div style={{ display: 'flex' }}>
            {slicedPartsData.map((slice, index) => (
    <div
      key={index}
      style={{
        border: '1px solid black',
        backgroundColor: 'blue',
        padding: '8px',
        margin: '8px',
        width: `${(slice.length)/10}px`,
        height: `${(slice.breadth)/30}px`,
        cursor:'pointer',
      }}
      onClick={() => handleSliceDivClick(slice)}
    >
      <p>{slice.slice_name}</p>
      <p>Length: {slice.length}</p>
      <p>Breadth: {slice.breadth}</p>
    </div>
  ))}
</div>

            </div>
            <div style={{color:'white',marginLeft:'5%'}}>
                <label>length</label><br/>
                <input type="text" value={selectedSliceLength} /><br/>
                <label>Breadth</label><br/>
                <input type="text" value={selectedSliceBreadth} /><br/>
                <label>Footprint Area</label><br/>
                <input type="text" placeholder="Footprint Area" value={footprintArea} readOnly /><br/>
                <label>Occupied Area</label><br/>
                <input type="text" placeholder="Occupied Area" value={occupiedArea} readOnly /><br/>
            </div>
            <div  style={{color:'white',marginLeft:'2%'}}>
            <label> Additional length</label><br/>
            <input
      type="text"
      placeholder="Additional Length"
      value={additionalLength}
      onChange={e => setAdditionalLength(e.target.value)}/><br/>
                <label> Additional Breadth</label><br/>
                <input
      type="text"
      placeholder="Additional Breadth"
      value={additionalBreadth}
      onChange={e => setAdditionalBreadth(e.target.value)}/><br/>
                <label>Walk Around Distance</label><br/>
                <input
      type="text"
      placeholder="Walk Around Distance"
      value={walkAroundDistance}
      onChange={e => setWalkAroundDistance(e.target.value)}
    /><br/>

    <button onClick={handleSubmit}>Calculate</button>
            </div>
            </div>  

            <div style={{ backgroundColor: 'white', width: '98%', height: '40vh', marginTop: '3%', padding: '1%', display: 'flex',textAlign:'center' }}>
  {plants.map((plant, index) => (
    <div
      key={index}
      style={{
        border: '1px solid black',
      
        padding: '8px',
        margin: '20px',
        width: '300px',
        height: '250px',
        cursor: 'pointer',
      }}
    >
      <p>Plant Number : {plant.plant_number}</p>

    </div>
  ))}
</div>

              
            </div>

           
        

    );
}

export default Book;