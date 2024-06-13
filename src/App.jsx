import { useState } from 'react'
import './HooksComponent/TodoList.css'
import './App.css'
import TodoList from './HooksComponent/TodoList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <TodoList/>
    </>
  )
}

export default App
