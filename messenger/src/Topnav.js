import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import './styles/topnav.css';
import { API_KEY, auth } from './FirebaseConfig';
import { signOut } from 'firebase/auth';

function Topnav(prop) {
  const history = useHistory();
  
  const User = JSON.parse(sessionStorage.getItem(`firebase:authUser:${API_KEY}:[DEFAULT]`));
  //console.log(User);
  const redirect = () => {
    history.push('/signin');
  }
  const redirectOut = ()=>{
    signOut(auth).then(()=>{
      alert('Signed Out');
      history.push('/');
    }
    )
    .catch((err)=>{
        alert(`${err}`)
    })
    
  }
  return (
    <div className='topnav'>
        <div className="left">
            <div className="empty">

            </div>
            <div className="pgtitle">Messenger</div>

        </div>
        <div className="right">
            { !prop.isLoggedIn && <>
                <div className="empty"></div>
              <div className="btns">
                  <button className='signup' type="button" onClick={redirect}>Sign Up</button>
              </div>
                  <div className="space"></div>
              <div className="btns">
                  <button className='login' type="button" onClick={redirect}>Login</button>
              </div>
            </>
            }
            {
              prop.isLoggedIn && <>
                  <div className="empty"></div>
                  <div className="username">{User.email}</div>
                  <div className="btns">
                    <button className='logout' type='button' onClick={redirectOut}>Logout</button>
                  </div>
              </>
            }
        </div>
    </div>
  )
}

export default Topnav