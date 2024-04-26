import React, { useState } from 'react'
import Axios from 'axios'
export default function CreateTodo({userId}) {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [completed, setCompleted] = useState(false)
    let sendTodo = async ()=>{
        let res = await Axios.post("http://localhost:8080/todo/new", {
            "title":title, 
            "desc":desc, 
            "completed":completed,
            "userId":userId
        })
        console.log(res)
    }
  return (
    <>
        <input type="text" name="title" id="title" placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)}/> 
        <br /><br />
        <textarea rows={10} cols={30} placeholder='Description' value={desc} onChange={(e)=>setDesc(e.target.value)}></textarea>
        <br /><br />
        <button onClick={()=>sendTodo()}>Submit</button>
    </>
  )
}
