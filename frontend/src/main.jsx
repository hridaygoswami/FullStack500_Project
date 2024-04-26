import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Todo from './Todo.jsx'
import CreateTodo from './CreateTodo.jsx'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

const routes = createBrowserRouter([
  {
    path:"/",
    element: <App/>
  },
  {
    path: "/todo",
    element: <Todo/>
  },
  {
    path: "/todo/new",
    element: <CreateTodo/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>,
)
