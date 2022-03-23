import React from 'react'
import Comment from '../components/Comment'
import '../style.css'
import data from '../data.json'

export default function App() {
  console.log(data.currentUser)
  return (
    <div className='app'>
      <Comment counter={10} />
      <Comment counter={20} />
      <Comment counter={20} />
      <Comment counter={20} />
    </div>
  )
}
