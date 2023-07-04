import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import './styles/messagearea.css';
import { db,API_KEY } from './FirebaseConfig';
import * as _ from 'lodash';
import { getDocs,collection,addDoc,updateDoc,query,where,onSnapshot,doc,or,Timestamp } from 'firebase/firestore';

const socket = io.connect("http://localhost:5000");


function MessageArea(prop) {
    const communicateTo = prop.communicateTo;
    const ThisUser = JSON.parse(sessionStorage.getItem(`firebase:authUser:${API_KEY}:[DEFAULT]`));
    const ThisUserEmail = ThisUser.email;
    const [message,setMessage] = useState('');
    const [displayedMessage,setDisplayedMessage] = useState([]);
    const [recievedMessage,setRecievedMessage] = useState('');
    const [currentRoom,setCurrentRoom] = useState('All');

    useEffect(()=>{
        console.log(communicateTo);
        async function f(){
            console.log(communicateTo)
            const querySnapshot = await getDocs(collection(db,`${ThisUserEmail}/${communicateTo}/message`))
            setDisplayedMessage([]);
            if(!querySnapshot.empty){
                
                querySnapshot.forEach(doc=>{
                
                    //setDisplayedMessage(prev=>[...prev,doc.data()])
                    
                    setDisplayedMessage(prev=>_.sortBy([...prev,doc.data()],'time'));
                })
            }
            
        }
        f();

    },[communicateTo])
    
    
    const handleSub = async () =>{
        // console.log("Message being sent: ",message);
        var d = new Date();
        //var dsec = d.getSeconds();
        socket.emit("send",{'communicateTo':communicateTo,'communicateFrom':ThisUserEmail,'msg':message,'timestamp':`${('0'+d.getHours()).slice(-2)}:${('0'+d.getMinutes()).slice(-2)}:${('0'+d.getSeconds()).slice(-2)}`}); 
        setDisplayedMessage((prev)=>[...prev,{'msg':message,'time':`${('0'+d.getHours()).slice(-2)}:${('0'+d.getMinutes()).slice(-2)}:${('0'+d.getSeconds()).slice(-2)}`,'from':ThisUserEmail}])  
        const querySnapshot = await addDoc(collection(db,`${ThisUserEmail}/${communicateTo}/message/`),{
            'msg': message,
            'time': `${('0'+d.getHours()).slice(-2)}:${('0'+d.getMinutes()).slice(-2)}:${('0'+d.getSeconds()).slice(-2)}`,
            'from': ThisUserEmail,
            'to':  communicateTo
        }
        );
        setMessage(''); 
    }
    useEffect(()=>{

        const singleFunc = async () =>{

           


            socket.on("recieve_message__all", async (data)=>{
                console.log(data);
                console.log(data.msg);
                const querySnapshot = await addDoc(collection(db,`${ThisUserEmail}/${data.from}/message/`),{
                    'msg': data.msg,
                    'time': data.time,
                    'from': data.from,
                    'to':ThisUserEmail
                }
                );
                setDisplayedMessage((prev)=>[...prev,data]);
            }) 
            socket.on(`${ThisUserEmail}__recieve_message__`,async (data)=>{
                console.log(data);
                console.log(data.msg);
                console.log(data.time);
                console.log(data.from);
                const querySnapshot = await addDoc(collection(db,`${ThisUserEmail}/${data.from}/message/`),{
                    'msg': data.msg,
                    'time': data.time,
                    'from': data.from,
                    'to':ThisUserEmail
                }
                );
                console.log(data.from);

                //
                /**
                 * @todo how to get the current comminucateTo value to check `if(communicateTo === data.from){ ... }`
                 */
                if(data.from === sessionStorage.getItem('sessionWith')){
                    setDisplayedMessage((prev)=>[...prev,data]);
                }
                

                //
            })

            // const querySnapshot = await getDocs(collection(db, `${ThisUserEmail}/${communicateTo}/message/`));
            // querySnapshot.forEach(
            //     (doc) => {
            //         setDisplayedMessage((prev)=>[...prev,doc.data()])
            //     }
            // )
            // console.log(displayedMessage);
        }
        
        return ()=>{singleFunc()}
    },[socket])


  return (
    <div className='messagearea' >
        <div className="roomdesc">{communicateTo}</div>
        <div className="messages">
            {displayedMessage.map((message,ind)=>{
                if(message.from == ThisUserEmail){
                    return (
                        <div className="replyside">
                            <div className="empty"></div>
                            <div className="reply" key={ind}>{message.msg}<br/><span>{message.time}</span></div>
                            
                        </div>
                        
                    )
                }
                else{
                    return (
                        <div className="sentside">
                            {/* 
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo eos aut vitae sit magni? Repellat neque animi veniam eaque nemo aliquam reprehenderit rerum alias quaerat molestiae dolor earum vel cupiditate minima, est deleniti sit nihil, magni exercitationem accusantium commodi? Quae soluta quis esse aperiam deleniti facilis! Suscipit dolores et ex sapiente consequatur ab quis totam accusamus hic numquam quidem a quia nobis, debitis id! Reiciendis eos ab corporis a quis consequuntur neque earum amet, delectus architecto expedita facere eaque dolorum exercitationem fugiat. Inventore eos quisquam ex quod voluptates eaque facere quibusdam tempore assumenda, at ipsum repellat, distinctio, hic provident facilis. */}
                        
                            <div className="sent" key={ind}>{message.msg}<br/><span>{message.time}</span></div>
                            <div className="empty"></div>
                        </div>
                        
                    )
                }
            })}
        </div>
        <div className="bottomtypingbar">
            <div className="empty">

            </div>
            <div className="typingbar">
                <input type="text" value={message} name="message" id="typemsg" placeholder='Message...' onChange={(event)=>{setMessage(event.target.value)}} />
                <button id='sendmsg' type="button" onClick={handleSub}>Send</button>
            </div>

            <div className="empty">

            </div>
        </div>
        
    </div>
  )
}

export default MessageArea