import React, { useEffect } from 'react'
import styles from '../style/navbar.module.css'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Navbar = () => {

  const [authStat, setAuthStat] = useState(false)

  useEffect(()=>{
    if(getAuth().currentUser){
      setAuthStat(true)
    }
  })

  const navigate = useNavigate();

  function handleClickSignout(){
    const auth = getAuth();
    if(auth.currentUser){
      signOut(auth).then(() => {
        // alert("signedout successfully")
        toast("Signed out successfully", {style:{
          background: "green"
        },icon: "✅"})
        setAuthStat(false)
        navigate('/student-login')
      }).catch((error) => {
        // An error happened.
      });
    }
  }
  return (
    <div className={styles.mainContainer}>
      <h2>ColdPlunge</h2>
      {authStat?<button onClick={handleClickSignout}>Signout</button>:null}
    </div>
  )
}

export default Navbar
