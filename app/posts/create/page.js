"use client"
import React from 'react'
import {useState ,useEffect} from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import '../../createstyle.css'
const Create = () => {
    const [name , setName] = useState('')
    // const [id , setId] = useState('')
    const [standard , setStandard] = useState('')
    const [age , setAge] = useState('')
    const [status , setStatus] = useState('')
    const [fees , setFees] =useState('')

    const formComplete = name && standard && age && status && fees
    const handleSubmit = async(e) => {
      if(!name || !standard|| !age || !status || !fees){
        alert("All fields are mandatory")
      }
        console.log(name ,standard ,age , status , fees)
        e.preventDefault()
        const dataSave= await axios.post('http://localhost:3000/api/create-user',{name ,standard ,age,status,fees})
        .then((dataSave)=>{
          console.log(dataSave)
        })
        .catch((error)=>{
          console.log(error)
        })
    }
    
return (
    <div>
      <h1>ADD NEW USER</h1>
      <form onSubmit={handleSubmit}>
        <input
        type ="text" 
        placeholder = "Enter the Name" 
        value = {name} 
        onChange= {(e)=>setName(e.target.value)}
        />
        {/* /* <input
        type ="text" 
        placeholder = "Enter the ID" 
        value = {id} 
        onChange= {(e)=>setId(e.target.value)}
        /> */}
        <input
        type ="text" 
        placeholder = "Enter the Standard" 
        value = {standard} 
        onChange= {(e)=>setStandard(e.target.value)}
        />
        <input
        type ="text" 
        placeholder = "Enter the Age" 
        value = {age} 
        onChange= {(e)=>setAge(e.target.value)}
        />
        <input
        type ="text" 
        placeholder = "Enter the Status" 
        value = {status} 
        onChange= {(e)=>setStatus(e.target.value)}
        />
        <input
        type ="text" 
        placeholder = "Enter the Fees" 
        value = {fees} 
        onChange= {(e)=>setFees(e.target.value)}
        />
        <button onClick={handleSubmit}>ADD</button>
      </form>
    </div>
  )
}

export default Create 