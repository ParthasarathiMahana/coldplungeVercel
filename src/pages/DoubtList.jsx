import React from 'react'
import { addDoc, collection, setDoc, doc, getDocs, onSnapshot, deleteDoc, getDoc, updateDoc} from 'firebase/firestore'
import { db } from '../firebase/config'
import { useEffect, useState } from 'react'
import styles from '../style/doubtList.module.css'
import Navbar from '../components/Navbar'
import ReplyForm from '../components/ReplyForm'
import { doubtActions, doubtSelector } from '../redux/reducers/doubtReducers'
import { useDispatch, useSelector } from 'react-redux'

const DoubtList = () => {

    const dispatch = useDispatch();
    const allDoubts = useSelector(doubtSelector);
    const [visibility, setVisibility] = useState('none');

    useEffect(()=>{
        onSnapshot(collection(db, "doubts"), (snapshot)=>{
            const myData = snapshot.docs.map((data)=>{
                const dateObj = new Date(data.data().date.seconds * 1000 + Math.floor(data.data().date.nanoseconds / 1e6))
                return {email: data.data().email, 
                    date: [dateObj.getHours(), dateObj.getMinutes()],
                    topic: data.data().topic, 
                    doubt: data.data().doubt,
                    mode: data.data().mode,
                    id: data.id,
                    acknowledgement: data.data().acknowledgement? data.data().acknowledgement:false}
            })
            dispatch(doubtActions.addDoubts(myData))
        })
    },[])

    async function handleClickAcknowledge(index){

        console.log(allDoubts);

        const docRef = doc(db, "doubts", allDoubts[index].id)
        try {
            // await updateDoc(docRef, doubtListData[index])
            await setDoc(docRef, {acknowledgement: !allDoubts[index].acknowledgement}, {merge: true})
        } catch (e) {
            console.log("Error getting cached document:", e);
        }
    }

    function handleClickReply(index){
        if(visibility === 'none'){
            setVisibility('flex')
        }else{
            setVisibility('none')
        }

        dispatch(doubtActions.activateDoubt(index))
    }

  return (
    <div>
        <Navbar/>
        <div className={styles.mainContainer}>
            <div className={styles.listItem}>
                <h3>Email</h3>
                <h3 className={styles.topicHeading}>Topic</h3>
                <h3>Doubt</h3>
                <h3>Mode</h3>
                <h3 className={styles.topicHeading}>Time</h3>
                <h3>Stat</h3>
            </div>
            <div className={styles.doubtContainer}>
                {allDoubts.map((data, index)=>{
                    return (
                        <div  key={index} className={styles.doubtsWithReplyBox}>
                            <div className={styles.doubtRow}>
                                <div>{data.email}</div>
                                <div className={styles.topic}>{data.topic}</div>
                                <div>{data.doubt}</div>
                                <div>{data.mode}</div>
                                <div className={styles.time}>{data.date[0]>12 ? data.date[0]-12+" : "+data.date[1]+" PM" : data.date[0]+" : "+data.date[1]+" AM"}</div>
                                <div>{data.acknowledgement?<button onClick={()=>handleClickAcknowledge(index)} style={{backgroundColor:"green"}} className={styles.statBtn}>Aknowledged</button>:<button onClick={()=>handleClickAcknowledge(index)} style={{backgroundColor:"red"}} className={styles.statBtn}>Aknowledge</button>}
                                {data.mode === "textReply"?<button onClick={()=>handleClickReply(index)} style={{backgroundColor:"black", marginLeft:"5px"}} className={styles.statBtn}>Reply</button>:null}
                                </div>
                            </div>
                        </div>
                    )
                })}
                <ReplyForm data = {{visibility:visibility, setVisibility:setVisibility}}/>
            </div>
        </div>
    </div>
  )
}

export default DoubtList
