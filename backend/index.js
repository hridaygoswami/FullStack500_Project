import express from 'express'
import cors from 'cors';
import User from './models/user.js';
import mongoose from 'mongoose';
import Todo from './models/todo.js';
import url from 'url';


const app = express()
import { MongoClient } from 'mongodb';
let connection_string = "mongodb://127.0.0.1:27017/"
const client = new MongoClient(connection_string)
let dataBase = "FullStack500"
mongoose.connect("mongodb://127.0.0.1:27017/FullStack500")
.then(()=>console.log("Connected to mongodb"))
.catch(()=>console.log("Some error occurred"))

app.use(cors())
app.use(express.json())


app.get("/", (req, res)=>{
    res.send("Connected from backend")
    console.log("Connected")
})

app.post("/register",async (req, res)=>{
    let userData = req.body
    var find;
    if (userData == undefined) {
        res.send("Some error")
    } else {
        console.log(req.body)
        // res.send("Data got")
        User.findOne({
            username: userData.userName,
                email: userData.email}).then((user)=>{
                    if(user) {
                        find = user
                        console.log(find)
                        res.send(`User Exsists-${user._id}`)
                    } else {
                        console.log("User not found")
                        let newUser = new User({
                            username: userData.userName,
                            email:userData.email,
                            password: userData.password
                        })
                        newUser.save()
                        console.log(newUser)
                        res.send("Data Stored")
                    }
                })
    }
})

app.post("/todo/insert", async (req, res)=>{
    let d = req.body
    console.log(d)
    let todoItem = new Todo({
        title: req.body.title,
        description: req.body.desc,
        completed: req.body.isComplete,
        user: req.body.user_id
    })
    todoItem.save()
    console.log(todoItem)
    res.send("Ok")
})

app.get("/todo/find/", async (req, res)=>{
    let response =await client.connect()
    let db = response.db(dataBase)
    let collection = db.collection("todos")
    let find = await collection.find().toArray()
    console.log(find)
    res.send(find)
    console.log(req.url)
})


app.post("/todo/new", async(req, res)=>{
    let d = req.body
    console.log(d) 
    res.send("Data got")
    // console.log(url.parse(req.url, true))
    let newTodo = new Todo({
        title: d.title,
        description: d.desc,
        completed: d.completed,
        user: String(d.userId)
    })
    newTodo.save()
    console.log(newTodo)
})

app.listen(8080, ()=>console.log("Backend in running at http://localhost:8080"))