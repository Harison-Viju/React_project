import React ,{useState,useEffect}from 'react';
import logo from './Saint-Gobain_SEFPRO_logo_2023.png';
import './login.css';
import user from './user.png';
import { useNavigate } from 'react-router-dom';

function Login(){
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const navigateToDashboard = () => {
      //  navigate 
      navigate('/dashboard');
    };



  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setIsLoading(false);
    };
    image.src = user;
  }, []);
    return(
    <>
   
    <div className="container">
    <div className='loginBox' >
        <h1>LOGIN</h1>
      
    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
    
    
        <div className="demo"style={{width:'80%',height:'80%',justifyContent:'center',display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div className="user-container">
                <img src={user} alt="user" style={{ width: '100px', height: '100px' }} />
                {isLoading && <div className="spinner" />}
              </div>
             
       
        <div className="wave-group">
          <input required type="text" className="input"  />
          <span className="bar"></span>
          <label className="label">
            <span className="label-char" style={{ "--index": 0 }}>S</span>
            <span className="label-char" style={{ "--index": 1 }}>G</span>
            <span className="label-char" style={{ "--index": 2 }}>_</span>
            <span className="label-char" style={{ "--index": 3 }}>I</span>
            <span className="label-char" style={{ "--index": 4 }}>D</span>
          </label>
        </div>
        
        <br/>
       <div className="wave-group">
          <input required type="password" className="input"  />
          <span className="bar"></span>
          <label className="label">
            <span className="label-char" style={{ "--index": 0 }}>P</span>
            <span className="label-char" style={{ "--index": 1 }}>a</span>
            <span className="label-char" style={{ "--index": 2 }}>s</span>
            <span className="label-char" style={{ "--index": 3 }}>s</span>
            <span className="label-char" style={{ "--index": 4 }}>w</span>
            <span className="label-char" style={{ "--index": 5 }}>o</span>
            <span className="label-char" style={{ "--index": 6 }}>r</span>
            <span className="label-char" style={{ "--index": 7 }}>d</span>
          </label>
        </div>
       <div className="Buttons">
       <button type="submit" className='learn-more' onClick={navigateToDashboard}>
        <span class="circle" aria-hidden="true">
        <span class="icon arrow"></span>
        </span>
        <span class="button-text"> SSO</span>
      </button><br/>
       </div>
       <br/>
       <div className="Buttons" style={{marginTop:'20px'}}>
       <button type="submit"  className='learn-more' onClick={navigateToDashboard} >
        <span class="circle" aria-hidden="true">
        <span class="icon arrow"></span>
        </span>
        <span class="button-text">LOGIN</span>
      </button>
    
       </div>   
        </div>
       
        
        
    </div>
    <div className="logo"  >
    <img src={logo} alt="Logo" style={{width:'150px',height:'50px',marginLeft:'3%'}}/>
    </div> 
    </div>
    </div>
   
</>
            
       
    );
}

export default Login;
  

