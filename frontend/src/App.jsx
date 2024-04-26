import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Axios from 'axios';
import { Link, redirect } from 'react-router-dom';
import Todo from './Todo';
function App() {

  const [userName, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [res, setRes] = useState("")
  const [user_Id, setUserId] = useState('')

  async function loader() {
    const response = await Axios.get("http://localhost:8080/")
    let d = response.data
    if (d == "User Exsists") {
      setUsername("")
      setEmail("")
      setPassword("")
    } else {
      console.log("Data Stored")
    }
  }

  async function userSenddata() {
    console.log(userName, password, email)
    let userData = {
      "userName": userName,
      "password": password,
      "email": email,
      "user_id": userId
    }

    let response = await Axios.post("http://localhost:8080/register", userData)
    console.log(response.data)
    let out = String(response.data).split("-")[0]
    let userId = String(response.data).split("-")[1]
    setRes(out)
    // console.log(userId)
    setUserId(userId)
  }

  return (
    <>
      {(res == "User Exsists") ?
        <Todo username={userName} user_id={user_Id} /> :
        <>
        <h1>{res}</h1>
          {/* <h2>User Saved</h2> */}
          <input type='text' value={userName} onChange={(e) => setUsername(e.target.value)} placeholder='User Name' />
          <br /><br />
          <input type="email" name="email" id="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <br /><br />
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
          <br /><br />
          <input type="file" src="" alt="" />
          <br /><br />
          <button onClick={() => userSenddata()}>Register</button>
        </>}
    </>
  )
}

export default App
