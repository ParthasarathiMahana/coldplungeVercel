import React from 'react'
import styles from '../style/doubtForm.module.css'
import Navbar from '../components/Navbar'
import { addDoc, collection, setDoc, doc, getDocs, onSnapshot, deleteDoc} from 'firebase/firestore'
import {db} from '../firebase/config'
import { useState } from 'react'
import MyDoubts from './MyDoubts'
import toast from 'react-hot-toast'
import { Icon } from '@chakra-ui/react'


const DoubtForm = (props) => {

    const [email, setEmail] = useState(props.email)
    const [batch, setBatch] = useState('')
    const [subject, setSubject] = useState('')
    const [topic, setTopic] = useState('')
    const [doubt, setDoubt] = useState('')
    const [mode, setMode] = useState('textReply')

    async function handleSubmit(){
        // console.log(name, batch, subject, topic, doubt, mode);
        let arrayOfStates = [email, batch, subject, topic, doubt, mode]

        for(let i of arrayOfStates){
          if(i == ''){
            return toast("Please enter all the values", {style:{
              background: "orange"
            }, icon: "⚠️"})
            // return alert('you need to enter all the values')
          }
        }
        
        await addDoc(collection(db, "doubts"), {
            email: email,
            date: new Date(),
            doubt,
            subject,
            topic,
            mode:mode
          });
          setBatch('')
          setSubject('')
          setTopic('')
          setDoubt('')
          setMode('')
          toast("Doubt raised successfully", {style:{
            background: "green"
          },icon: "✅"})
    }

    function handleSelectOptionChange(e){
      console.log(e.target.value);
      setMode(e.target.value)
    }

  return (
    <div>
        <Navbar/>
        <div className={styles.mainContainer} style={{marginTop:"-0.1rem"}}>
          <input type="text" placeholder='Name' value={email} onChange={e=>setName(e.target.value)} disabled/>
          <input type="text" placeholder='Enter batch number' onChange={e=>setBatch(e.target.value)} value={batch}/>
          <input type="text" placeholder='Subject' onChange={e=>setSubject(e.target.value)} value={subject}/>
          <input type="text" placeholder='Topic' onChange={e=>setTopic(e.target.value)} value={topic}/>
          <textarea name="" id="" cols="30" rows="10" placeholder='Explain doubt in detail' onChange={e=>setDoubt(e.target.value)} value={doubt}></textarea>
          {/* <input type="text" placeholder='Need 1 on 1, or text reply' onChange={e=>setMode(e.target.value)} value={mode}/> */}
          <select name="modeOfReply" onChange={handleSelectOptionChange} style={{paddingLeft:"1rem"}}>
            <option value="textReply">Text reply</option>
            <option value="oneOnOne">Need 1 on 1</option>
          </select>
          <button onClick={handleSubmit}>Raise doubt</button>
        </div>
        <MyDoubts email = {email} />
    </div>
  )
}

export default DoubtForm
