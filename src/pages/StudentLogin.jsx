import React from 'react'
import styles from '../style/form.module.css'
import { useState, useEffect } from 'react'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'
import toast from 'react-hot-toast';


const StudentLogin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isAuth, setIsAuth] = useState(false)

    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(()=>{
      const user = auth.currentUser;
      onAuthStateChanged(auth, (user) => {
        if (user) {
          navigate('/')
        }
        setIsAuth(true)
      });
    })

    function toggleShowPassword(){
        setShowPassword(!showPassword)
    }

    function handleClickLogin(){
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // alert("signedin successfully")
            toast("Signed in successfully", {style:{
              background: "green"
            },icon: "✅"})
            navigate('/')
        })
        .catch((error) => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // console.log("error code:",errorCode, "error message:", errorMessage);
            toast("Invalid Email or Password", {style:{
              background: "red"
            }})
        });
    }

    function handleClickSignup(){
      navigate('/student-signup')
    }

  return (
    <>
      <Navbar/>
      {isAuth ? 
      <div className={styles.mainContainer}>
        <input type="text" value={email} onChange={e=>setEmail(e.target.value)} placeholder='email'/>
        <div className={styles.passwordSection}>
          {showPassword?<input type="text" value={password} onChange={e=>setPassword(e.target.value)} placeholder='password'/>
          :<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder='password'/>}
          <button onClick={toggleShowPassword}>{showPassword?"hide":"show"}</button>
        </div>
        <button onClick={handleClickLogin}>Login</button>
        <a onClick={handleClickSignup} className={styles.linkToSignupPage}>Go to signup page</a>
      </div> : null}
    </>
  )
}

export default StudentLogin
