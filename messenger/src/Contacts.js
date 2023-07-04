import React, { useEffect, useState } from 'react';
import './styles/contacts.css';
//import { auth } from './FirebaseConfig';
import { db,API_KEY } from './FirebaseConfig';
import { getDocs,collection } from 'firebase/firestore';

function Contacts(prop) {
    const ThisUser = JSON.parse(sessionStorage.getItem(`firebase:authUser:${API_KEY}:[DEFAULT]`));
    const ThisUserEmail = ThisUser.email;
    const [inputVal,setInputVal] = useState('Search by Email');
    const [users,setUsers] = useState([]);
    const [userListlen,setUserListlen] = useState(false);
    const setCommunicateTo = prop.setCommunicateTo;
    const search = async ()=>{
        if(inputVal.toLowerCase() === 'all'){
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
            if(!(users.includes(doc.data().email)) ){
                setUsers((prev)=>[...prev,doc.data().email]);
            }
            
});
        }
    }


    const searcht = async ()=>{
        await search();
        // console.log(users);

        //setUsers([... new Set(users)]);
        if(users.length !== 0){
            setUserListlen(true);
        }
    }

    
  return (
    <div className='contact'>
        <div className="upperempty"></div>
        <div className="searchbar">
            <div className="empty"></div>
            <input type='email' placeholder={inputVal} onChange={
                (event)=>{setInputVal(event.target.value)}} />
                <div className="empty"></div>
            <button className='search' type="button" onClick={searcht}>Search</button>
            <div className="empty"></div>
        </div>
        <div className="sectiontitle">Your Contacts (Type 'All' and search for all contacts)</div>
        <div className="contactlist">
                {   
                    users.map((user)=>{
                        if(user !== ThisUserEmail) return (<div key={user} className="contactitem" onClick={()=>{prop.setCommunicateTo(user);sessionStorage.setItem('sessionWith',user)}}>{user}</div>)
                    })
                }
        </div>

    </div>
  )
}

export default Contacts