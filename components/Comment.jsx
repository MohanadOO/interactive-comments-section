import React from 'react'

export default function Comment(props) {
  const [counter, setCounter] = React.useState(props.counter)
  return (
    <div className='comment'>
      <div className='user-info'>
        <img
          className='user-logo'
          src='../images/avatars/image-amyrobson.png'
        />
        <p className='user-name'>amyrobson</p>
        <p className='comment-date'>1 month ago</p>
      </div>
      <p className='comment-message'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
        impedit quae! Dolores sint aspernatur nobis odit ducimus nisi nostrum,
        cumque magni sapiente voluptates, recusandae itaque.
      </p>
      <div className='comment-info'>
        <div className='comment-rate'>
          <img src='../images/icon-plus.svg' />
          <p>{counter}</p>
          <img src='../images/icon-minus.svg' />
        </div>
        <div className='comment-reply'>
          <img src='../images/icon-reply.svg' />
          <span>Reply</span>
        </div>
      </div>
    </div>
  )
}
