import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import CreateTodo from './CreateTodo'

export default function Todo({username, userId}) {
  const [todoList, setTodoList] = useState([])
  const [singleItem, setSingleItem] = useState()
  const [userName, setUsername] = useState("")

  const currentURL = ()=>{
    console.log(window.location.href)
  }
  const storeTodo = async ()=>{
    let srNo
    if (todoList.length == 0){
      var item = {   
        "srNo":1,
        "title":singleItem,
        "isComplete": false
      }
    }
    else {
      var item = {   
        "srNo":todoList.length-1,
        "title":singleItem,
        "isComplete": false
      }
    }
    setTodoList([...todoList, item])
    let response = await Axios.post("http://localhost:8080/todo/insert", item)
    console.log(response)
  }

  useEffect(()=>{
    console.log(todoList)
  }, [todoList])

  useEffect(()=>{
    async function getData() {
      let response =await Axios.get("http://localhost:8080/todo/find")
      console.log(response.data)
      setTodoList([...todoList, ...response.data])
    }
    getData()
    currentURL()
  }, [])

  return (
    <>
    <h1>Hello {username == ""?"Unknown User":username}</h1>
        <CreateTodo username={username} userId={userId}/>
        <ul>

        {(todoList.length === 0)?<h1>No Todo</h1>:
          todoList.map((td, index)=>{
            return <li key={index}>
              {td.title}
              <input type="checkbox" name="isCompleted" id="isCompleted" value={td.isComplete} />
              </li>  
          })
        }
        </ul>
    </>
  )
}
