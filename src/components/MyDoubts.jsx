import React, { useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { db } from '../firebase/config'
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'
import styles from '../style/myDoubts.module.css'

const MyDoubts = (props) => {
  const auth = getAuth()
  const [mydoubtList, setMyDoubtList] = useState([])

  useEffect(()=>{
    onAuthStateChanged(auth, async(user)=>{
      onSnapshot(collection(db, "doubts"), (snapshot)=>{
        const tempDoubtList = snapshot.docs.filter((item)=>{
          return item.data().email === props.email
        })
        const tempDL2 = tempDoubtList.map((item)=>item.data())
        // console.log(tempDL2);
        setMyDoubtList(tempDL2)
      })
    })
  },[])
  return (
    <div className={styles.mainContainer}>
      <h2>Your Doubts</h2>
          <div className={styles.doubtRow} style={{marginTop:"2rem"}}>
            <div className={styles.sub} style={{fontWeight:"bold", borderBottom:"2px solid red", marginRight:"1rem"}}>Subject</div>
            <div className={styles.topic}style={{fontWeight:"bold", borderBottom:"2px solid red", marginRight:"1rem"}}>Topic</div>
            <div className={styles.doubt}style={{fontWeight:"bold", borderBottom:"2px solid red", marginRight:"1rem"}}>Doubt</div>
            <div className={styles.ack}style={{fontWeight:"bold", borderBottom:"2px solid red", marginRight:"1rem"}}>Acknowledgement</div>
            <div className={styles.ans}style={{fontWeight:"bold", borderBottom:"2px solid red", marginRight:"1rem"}}>Answer</div>
          </div>
      {mydoubtList.map((item, index)=>{
        return (
          <div key={index} className={styles.doubtRow}>
            <div className={styles.sub}>{item.subject}</div>
            <div className={styles.topic}>{item.topic}</div>
            <div className={styles.doubt}>{item.doubt}</div>
            <div className={styles.ack}>{item.acknowledgement ? "acknowledged" : "not acknowledged"}</div>
            <div className={styles.ans} >{item.answer ? item.answer : ""}</div>
          </div>
        )
      })}
    </div>
  )
}

export default MyDoubts
