import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboard.css';
import logo from './Saint-Gobain_SEFPRO_logo_2023.png';
import io from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


const socket = io('http://localhost:5000');

function TableData() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [deleteRow, setDeleteRow] = useState(null);
  const [editedRow, setEditedRow] = useState({
    area_number: '',
    plant_number: '',
    length: '',
    breadth: '',
    pad_length: '',
    pad_breadth: '',
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  useEffect(() => {
   

    axios
      .get('http://localhost:5000/api/data')
      .then(response => {
        setData(response.data);
        console.log('Response from server:', response.data);
      })
      .catch(error => {
        console.log(error);
      });

      const updateTableDataWithNewPad = (newData) => {
        setData((prevData) => [...prevData, newData]);
      };
      socket.on('newPadAdded', updateTableDataWithNewPad);
  
      return () => {
        socket.off('newPadAdded', updateTableDataWithNewPad);
      };
      
  }, []);

  

  useEffect(() => {
    // Fetch data for the editedRow (if available) when the isEditModalOpen state changes
    if (isEditModalOpen && editedRow) {
      axios
        .get(`http://localhost:5000/api/data/${editedRow.area_number}`)
        .then((response) => {
          // Update the editedRow with fetched data
          setEditedRow(response.data);
        })
        .catch((error) => {
          console.error(error);
          setIsEditModalOpen(false);
        });
    }
  }, [isEditModalOpen, editedRow]);


  const filteredData = data.filter(item => {
    const searchString = searchText.trim().toLowerCase();
    return (
      item.area_number.toLowerCase().includes(searchString) ||
      item.plant_number.toString().includes(searchString));/* ||
    item.total_area.toString().includes(searchString) ||
      item.available_area.toString().includes(searchString) ||
      item.occupied_area.toString().includes(searchString)
    )*/
  });

  const handleDelete = (row) => {
    setDeleteRow(row);
  }

  const handleConfirmDelete = () => {
    if (deleteRow) {
      // Step 3: Perform the actual deletion upon confirmation
      // Assuming that the 'assemblyarea_number' uniquely identifies the row in the database
      axios
        .delete(`http://localhost:5000/api/data/${deleteRow.area_number}`)
        .then((response) => {
          // Refresh the data after deletion
          setData((prevData) => prevData.filter((item) => item !== deleteRow));
          setDeleteRow(null); // Reset the deleteRow state variable
        })
        .catch((error) => {
          console.error(error);
          setDeleteRow(null); // Reset the deleteRow state variable in case of an error
        });
    }
  };

  useEffect(() => {
    // Fetch data for the editedRow (if available) when the isEditModalOpen state changes
    if (isEditModalOpen && editedRow && editedRow.area_number) {
      axios
        .get(`http://localhost:5000/api/data/${editedRow.area_number}`)
        .then((response) => {
          // Update the editedRow with fetched data
          setEditedRow(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isEditModalOpen, editedRow]);

  const handleEdit = (item) => {
    setEditedRow({
      area_number: '',
      plant_number: '',
      length: '',
      breadth: '',
      pad_length: '',
      pad_breadth: '',
    });
    // Fetch the data for the selected row from the server
    axios
      .get(`http://localhost:5000/api/data/${item.area_number}`)
      .then((response) => {
        setEditedRow(response.data);
        setIsEditModalOpen(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  
  const handleEditSubmit = (event) => {
    event.preventDefault();
    console.log('Updated row:', editedRow);
    
    // Implement update functionality here
    axios
      .put(`http://localhost:5000/api/data/${editedRow.area_number}`, editedRow)
      .then((response) => {
        console.log('Server response:', response.data);
        setIsEditModalOpen(false);
        setEditedRow({
          area_number: '',
          plant_number: '',
          length: '',
          breadth: '',
          pad_length: '',
          pad_breadth: '',
        });
        // Reset the editedRow state
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setEditedRow({
      area_number: '',
      plant_number: '',
      length: '',
      breadth: '',
      pad_length: '',
      pad_breadth: '',
    });
  };
  


  return (
    <div>
    <div className="searchTab" >
        <input type="text" placeholder={'search assembly area...' } className="search" value={searchText} onChange={e=> setSearchText(e.target.value)} />
       </div>
    <table style={{marginTop:"3%"}}>
      <thead>
        <tr>
          <th>Assembly Area number</th>
          <th>Plant number</th>
          <th>Total Area</th>
          <th>Available Area</th>
          <th>Occupied Area</th>
          <th>Percentage of Use</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        
        {filteredData.map(item => (
          <tr key={item.area_number}>
            <td>{item.area_number}</td>
            <td>{item.plant_number}</td>
            <td>{item.total_area}</td>
            <td>{item.available_area}</td>
            <td>{item.occupied_area}</td>
            <td>
              <div className="progress">
                <div className="progress-bar" style={{width :`${(item.occupied_area/item.total_area)*100}%`}}>
                <div className="progress-overlay">
              <div className="progress-text">{`${Math.round((item.occupied_area / item.total_area) * 100)}%`}</div>
            </div>
             </div>
                
              </div>
            </td>
            <td>
                <FontAwesomeIcon icon={faPencilAlt} className="edit" style={{ color: "gray",marginLeft:"5%" }} onClick={()=>handleEdit(item)} />
                <FontAwesomeIcon icon={faTrashAlt} className="delete" style={{ color: "gray", marginLeft:"10%"}} onClick={() => handleDelete(item)}/>
              </td>
          </tr>
        ))}
      </tbody>
    </table>
    {deleteRow && (
        <div className="custom-modal">
          <div className="modal-content">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this row?</p>
            <button onClick={() => setDeleteRow(null)} >Cancel</button>
            <button id="deletebtn"onClick={handleConfirmDelete}style={{marginLeft:"50%"}}>Delete</button>
          </div>
        </div>
      )}

      
{isEditModalOpen && editedRow && (
  <div className="custom-modal">
  <div className="modal-content" >
    <h2>Edit Assembly Area</h2>
    
      <label>Assembly area number</label><br/>
      <input
        type="text"
        className='forminput'
        placeholder='assemblyarea number'
        value={editedRow.area_number}
        onChange={(e) =>
          setEditedRow((prevEditedRow) => ({
            ...prevEditedRow,
            area_number: e.target.value, // Update the correct property
          }))
        }
      />
        
        <br/>
        <label>Plant number</label><br/>
        <input
          type="text"
          className='forminput'
          placeholder="plant number"
          value={editedRow.plant_number}
          onChange={(e) => setEditedRow({ ...editedRow, plant_number: e.target.value })}
        />
         <br/>
         <label>Length</label><br/>
     <input
       type="text"
       className='forminput'
       placeholder="length"
       value={editedRow.length}
       onChange={(e) => setEditedRow({ ...editedRow, length: e.target.value })}
     />

<br/>
<label>Breadth</label><br/>
     <input
       type="text"
       className='forminput'
       placeholder="breadth"
       value={editedRow.breadth}
       onChange={(e) => setEditedRow({ ...editedRow, breadth: e.target.value })}
     />
      
      <br/>
      <label>Assembly pad:</label><br/>
      <label>Length</label>
     <input
       type="text"
       className='forminput'
       placeholder="padLength"
       value={editedRow.pad_length}
       onChange={(e) => setEditedRow({ ...editedRow, pad_length: e.target.value })}
     />
      
      <br/>
      <label>Breadth</label>
     <input
       type="text"
       className='forminput'
       placeholder="padBreadth"
       value={editedRow.pad_breadth}
       onChange={(e) => setEditedRow({ ...editedRow, pad_breadth: e.target.value })}
     />
      
      <br/>
      <button onClick={handleEditSubmit}>Update</button>
      <button onClick={handleModalClose} style={{marginLeft:'30%'}}>Cancel</button>

  </div>
</div>
)}
    </div>
  );
}



function DashBoard() {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isAlert,setIsAlertOpen]=useState(false);// State to control the visibility of the modal

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
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  const handleCancel=()=>{
    handleCloseModal();
  };

  const handleisAlert = () => {
    handleCloseModal();
    const areaNumber = document.getElementById('areaNumberInput').value;
    const plantNumber = document.getElementById('plantNumberInput').value;
    const length = document.getElementById('lengthInput').value;
    const breadth = document.getElementById('breadthInput').value;
    const padLength = document.getElementById('padlengthInput').value;
    const padBreadth = document.getElementById('padbreadthInput').value;
    const rows = document.getElementById('rows').value;
    const columns = document.getElementById('columns').value;

    axios
    .post('http://localhost:5000/api/data', { areaNumber, plantNumber, length, breadth,padLength,padBreadth,rows,columns})
    .then((response) => {
      console.log('Server response:',response.data); // If needed, you can display a success message to the user
      setIsAlertOpen(true);
       // Show the success alert
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


  return (
    <div className="Container">
      <div className="Header" style={{ display: 'flex' }}>
      <div className="pages">
          <img src={logo} alt="logo" style={{ width: '200px', height: '50px' }} />
        </div>
        <div className="pages">
          <p className='home' style={{ color: 'hsl(180.3deg 100% 39.02%)' }} onClick={navigateToDashboard}>Home</p>
        </div>
        <div className="pages">
          <p className='newplan'>New Plan </p>
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
     
      
       <div className="newpad" style={{ display: 'flex', justifyContent: 'flex-end',marginTop:"2%"}} >
        <button  onClick={handleOpenModal} >New Assembly Area</button>
       </div>
    

      {isModalOpen && (
        <div className="custom-modal">
          <div className="modal-content">
            <h2>Add a new Assembly Pad</h2>
            <div style={{textAlign:'center'}} >
              <input type="text" id="areaNumberInput"placeholder="Assembly Area Number"style={{width:'80%'}} />
              <br/>
              <input type="text" placeholder="Plant Number"  id="plantNumberInput" style={{width:'80%'}}/><br/>
              <input type="text" id="lengthInput" placeholder="Length"  style={{width:'35%'}}/> x
              <input type="text" id="breadthInput" placeholder="Breadth" style={{width:'35%'}} /><br/>
              <input type="text" id="padlengthInput" placeholder="pad Length"  style={{width:'35%'}}/> x
              <input type="text" id="padbreadthInput" placeholder="pad Breadth" style={{width:'35%'}} /><br/>
              <input type="text" id="rows" placeholder="rows"  style={{width:'35%'}}/> x
              <input type="text" id="columns" placeholder="columns" style={{width:'35%'}} /><br/>

              
              <button onClick={handleisAlert}>Create</button>
              <button onClick={handleCancel} style={{marginLeft:'50%'}}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {isAlert && (
           <div className="custom-modal">
           <div className="modal-content">
           <h3>Successfully added assembly area</h3>
           <button onClick={handleSubmit}>OK</button> 
            </div>
            </div>
      )}
     
      
      <div className="assemblyPadTable" style={{marginTop:'2%'}}>
  <div className="table-container">
    <TableData />
  </div>
</div>

    </div>
  );
}

export default DashBoard;
