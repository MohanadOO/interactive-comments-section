import React from 'react'

export default function Comment(props) {
  const [score, setScore] = React.useState(props.counter)

  function increaseScore() {
    if (score > props.counter) {
      return ''
    }
    return setScore((prevDate) => prevDate + 1)
  }

  function decreaseScore() {
    if (score < props.counter) {
      return ''
    }
    setScore((prevDate) => prevDate - 1)
  }

  return (
    <div className='comment'>
      <div className='user-info'>
        <img className='user-logo' src={props.image} />
        <p className='user-name'>{props.username}</p>
        {props.currentUser && <p className='you-card'>you</p>}
        <p className='comment-date'>{props.createdAt}</p>
      </div>
      <p className='comment-message'>{props.content}</p>
      <div className='comment-info'>
        <div className='comment-rate'>
          <img onClick={increaseScore} src='../images/icon-plus.svg' />
          <p>{score}</p>
          <img onClick={decreaseScore} src='../images/icon-minus.svg' />
        </div>
        {props.currentUser ? (
          <div className='comment-edit'>
            <span onClick={props.handleDelete}>
              <img src='../images/icon-delete.svg' />
              <span className='comment-edit-delete'>Delete</span>
            </span>
            <span onClick={props.handleEdit}>
              <img src='../images/icon-edit.svg' />
              <span className='comment-edit-edit'>Edit</span>
            </span>
          </div>
        ) : (
          <div className='comment-edit'>
            <div onClick={props.handleReply}>
              <img src='../images/icon-reply.svg' />
              <span className='comment-edit-reply'>Reply</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
