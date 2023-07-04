import React, { useEffect, useState } from 'react'
import Topnav from './Topnav';
import Contacts from './Contacts';
import MessageArea from './MessageArea';
import './styles/home.css'

function Home() {
  const [communicateTo,setCommunicateTo] = useState('All');
  
  useEffect(()=>{
    const print = () => {
      console.log(communicateTo);
    }
    print();
  },[communicateTo])
  return (
    <div className='home'>
        <Topnav isLoggedIn={true}/>
        <div className="homewrap">
          <Contacts setCommunicateTo={setCommunicateTo}/>
          <MessageArea communicateTo={communicateTo}/>
        </div>
        
    </div>
  )
}

export default Home