import React ,{useState} from 'react';
import logo from './Saint-Gobain_SEFPRO_logo_2023.png';
import './Planning.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Planning() {
  const [isAlert,setIsAlertOpen]=useState(false);
  
  const handleisAlert = () => {

    const customer_name = document.getElementById('customer_name').value;
    const oa_number = document.getElementById('oa_number').value;
    const drawing_number = document.getElementById('drawing_number').value;
    const module_name =document.getElementById('module_name').value;
    const breadth = document.getElementById('breadth').value;
    const length = document.getElementById('length').value;
    const height = document.getElementById('height').value;
    const no_of_views=document.getElementById('no_of_views').value;

    axios
    .post('http://localhost:5000/api/product', { customer_name,oa_number, drawing_number,module_name,length, breadth,height,no_of_views })
    .then(() => {
      console.log('Data sent to server:', { customer_name, oa_number, drawing_number, module_name, length, breadth, height, no_of_views });
      setIsAlertOpen(true);
    })
    .catch((error) => {
      console.error(error); // Handle any error that occurred during the request
    });

    
    
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };
  const handleSubmit = () => {
    // Handle form submission here
   
    handleCloseAlert();
    
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
          <p className='home' style={{ color: 'hsl(180.3deg 100% 39.02%)' }}>New Plan </p>
        </div>
        <div className ="nav" style={{display:''}}>
            <div  className="navbar"onClick={navigateToPlanning}>Plan</div>
            <div className="navbar"onClick ={navigateToFileupload}>File Upload</div>
            <div className="navbar"onClick={navigateToSlicing}>Slice</div>
            <div className="navbar"onClick={navigateToBook}>Book</div>
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
        <h1 style={{ textAlign: 'center' }}>PLANNING</h1>
       
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
    <button style={{ width: '10%' }}>File Upload</button>
</div>

      <div  className="det"style={{display:'flex',color:"#1D5D9B"}}>
        <div  className="detLeft"style={{width:'50%'}}> 
        <label>Customer Name</label> <br/>
        <input type="text" id="customer_name"/><br/><br/>
        <label> Assembly Drawing Number</label><br/>
        <input type="text"  id="drawing_number"/><br/><br/>
        <label>Length</label><br/>
        <input type="text"  id="length"/><br/><br/>
       <label>Height</label><br/>
        <input type="text"  id="height"/><br/>
        </div>
        <div style={{width:'50%'}}>
        <label>Order Number</label><br/>
        <input type="text"  id="oa_number"/><br/><br/>
        
        <label>Module  Name</label><br/>
        <input type="text"  id="module_name"/><br/><br/>
      
        <label>Breadth</label><br/>
        <input type="text" id="breadth"/><br/><br/>

        <label>No. of views</label><br/>
        <input type="text" id="no_of_views"/><br/><br/>
      
    </div>
    </div>
      <div className ="footer"style={{display:'flex',marginTop:'10vh'}}>
      <div style={{width:'33%',marginLeft:'12%'}}>
        <button>save</button>

      </div>
      <div style={{width:'33%', marginLeft:'12%'}}>
      <FontAwesomeIcon icon={faPencilAlt} className="edit" style={{ color: "gray",marginLeft:"5%" }}/> 
      </div>
      <div style={{width:'33%'}}>
        <button style={{marginLeft:'12%'}} onClick={handleisAlert}>submit</button>
      </div>
      </div>
      {isAlert && (
           <div className="custom-modal">
           <div className="modal-content">
           <h3>Success</h3>
           <button onClick={handleSubmit}>OK</button> 
            </div>
            </div>
      )}
      
      </div>
            
               
  );
}

export default Planning;


