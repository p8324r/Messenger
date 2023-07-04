import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './styles/Signin.css';
import { auth,provider,db, API_KEY } from './FirebaseConfig';
import { signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider,createUserWithEmailAndPassword, getAdditionalUserInfo } from 'firebase/auth';
import { collection,addDoc } from 'firebase/firestore';
function Signin() {
 
    const [isLoginFocus,setisLoginFocus] = useState(true);
    const [loginEmail,setLoginEmail] = useState();
    const [signupEmail,setSignupEmail] = useState();
    const [loginPass,setLoginPass] = useState();
    const [signupPass,setSignupPass] = useState();
    const [confSignupPass,setconfSignupPass] = useState();
    const [isPassNotMatch,setIsPassNotMatch] = useState(false);
    const [signUpUsername,setSignUpUsername] = useState();
    const history = useHistory();

    const login = ()=>{
        signInWithEmailAndPassword(auth, loginEmail, loginPass)
        .then(
            (userCredential) => {
                // Signed in 
                const user = userCredential.user;
                //sessionStorage.setItem('user',JSON.stringify(user));
                history.push('/user');
                
                // ...
            }
        )
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(`${errorMessage} : ${errorCode}`);
            });
        
    };
    const signup = ()=>{
        if(signupPass !== confSignupPass){
            setIsPassNotMatch(true);
        }
        else{
            createUserWithEmailAndPassword(auth,signupEmail,signupPass).then(
                 async (userCredential)=>{
                    const user = userCredential.user;
                    console.log(user);
                    //sessionStorage.setItem('user',JSON.stringify(user));
                    const userObj = JSON.parse(JSON.stringify(user));
                    const customUserObj = {
                        'apiKey': userObj.apiKey, 
                        'email':userObj.email,
                        'uid':userObj.uid,
                        'displayName':`${signUpUsername}` }
                    console.log(customUserObj);
                    try {
                        const docRef = await addDoc(collection(db,'users'),customUserObj);
                    } catch (error) {
                        alert(`${error}`);
                    }
                    history.push('/user');
                }
            )
            
        }
    };

    const googleSignin = ()=>{
        signInWithPopup(auth, provider)
        .then( async(result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            const { isNewUser } = getAdditionalUserInfo(result); 
            if(isNewUser){
                const customUserObj = {'apiKey':API_KEY,'email':user.email,'uid':user.uid,'displayName':user.displayName}
                //sessionStorage.setItem('user',JSON.stringify(user));
                try {
                    const docRef = await addDoc(collection(db,'users'),customUserObj);
                } catch (error) {
                    alert(`${error}`);
                }
            }
            history.push('/user');
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
        
    }
  return (
    <div className='signinpage'>
        <div className="Empty"></div>
            <div className="compwrap">
                <div className="topempty"> Messenger </div>
                <div className="selwrap">
                    <div className="signup" onClick={()=> setisLoginFocus(false)}>
                        Sign Up
                    </div>
                    <div className="login" onClick={()=> setisLoginFocus(true)}>
                        Login
                    </div>
                </div>
                <div className="inputwrap">
                    <label htmlFor="Email" className="email">Email</label>
                    <input type="email" className="email" id="Email" required onChange={
                        (event)=>{
                            if(isLoginFocus) setLoginEmail(event.target.value);
                            else setSignupEmail(event.target.value);
                        }
                    }/>
                    <label htmlFor="Password" className="pass">Password</label>
                    <input type="password" className="pass" id="Password" required onChange={
                        (event)=>{
                            if(isLoginFocus) setLoginPass(event.target.value);
                            else setSignupPass(event.target.value);
                        }
                    }/>
                    { !isLoginFocus && 
                        <>
                            <>
                            <label htmlFor="Confirmpass" className="confirmpass">Confirm Password</label>
                            <input type="password" className="confirmpass" id="Confirmpass" required
                            onChange={
                                (event)=>{
                                    setconfSignupPass(event.target.value);
                                }
                            }/>
                            <label htmlFor='SignupUserName' className='signupusername'>Username</label>
                            <input type="text" className="signupusername" id="SignupUserName" required 
                                onChange={
                                    (event)=>{setSignUpUsername(event.target.value)}
                                }
                            />
                            </>
                            
                            {
                                isPassNotMatch && 
                                <div className="notmatch">
                                    Passwords didn't match,Please enter same password in both.
                                </div>
                            }
                            {/* {
                                isSignuperr && 
                                <div className="signuperr">
                                    Some Error occured while Signing up! Please try again.
                                </div>
                            } */}
                        </>
                    }
                    {/* {
                        isLoginFocus &&  
                        <>
                            <div className="loginerr">Some Error occured while Logging in!</div> <div>Error: {isLoginerr}</div>
                        </>
                    } */}
                    {
                        isLoginFocus && 
                        <>
                            <button type="submit" className="Login" onClick={login}>Login</button>
                            <a className='forgot' href='#'>Forgot Password?</a>
                        </>
            
                    }
                    {
                        !isLoginFocus &&
                        <>
                            <button type="submit" className="Signup" onClick={signup}>Sign Up</button>
                        </>
                    }
                </div>
                <br />
                <div className="orwrap">
                    <div></div>
                    <p>Or</p>
                    <div></div>
                </div>
                
                <div className="signinusingGoogle"><button type="button" className="login-with-google-btn" onClick={googleSignin}>Sign Up/Login Using Google</button></div>
                <div className="bottomempty"></div>

            </div>
            <div className="Empty"></div>
    </div>
  )
}

export default Signin