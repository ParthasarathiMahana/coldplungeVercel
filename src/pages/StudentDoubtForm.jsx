import React from 'react'
import { useState, useEffect } from 'react'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
// import { debounce } from 'lodash'
// import { useNavigate } from 'react-router-dom'
import DoubtForm from '../components/DoubtForm'
import StudentLogin from './StudentLogin'

const StudentDoubtForm = () => {

    // const navigate = useNavigate()
    const [isAuthChecked, setIsAuthChecked] = useState(false)
    const [emailOfUser, setEmailOfUser] = useState('')
    // const debouncedNavigate = debounce((path)=>navigate(path), 500)
    const auth = getAuth()

    useEffect(()=>{
      onAuthStateChanged(auth, (myuser) => {
        if (myuser){
          setIsAuthChecked(true)
          setEmailOfUser(myuser.email)
          console.log(myuser);
        }
        else{
          setIsAuthChecked(false)
        }
      });
    })

  return (
    <>
      {isAuthChecked ? <DoubtForm email={emailOfUser}/> : <StudentLogin/>}
    </>
  )
}

export default StudentDoubtForm