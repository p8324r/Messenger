import React from 'react';
import './styles/mainpage.css';
import Topnav from './Topnav';
function Mainpage() {
  return (
    <div className='mainpage'>
      <Topnav isLoggedIn = {false}/>
      <div className='mainpage-cont'>
        <div className="left">
          Real Time Messaging <br/> <p className='transition'>with emails as your and others identity.</p>
        </div>    
        <div className="right">
          Supports sign-up/login through essentially any email.
        </div>
      </div>
    </div>
  )
}

export default Mainpage