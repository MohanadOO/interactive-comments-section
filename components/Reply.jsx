import React from 'react'

export default function Reply(props) {
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
    <div className='reply'>
      <hr className='reply-divider' />
      <div className='reply-section'>
        <div className='user-info'>
          <img className='user-logo' src={props.image} />
          <p className='user-name'>{props.username}</p>
          {props.currentUser && <p className='you-card'>you</p>}
          <p className='comment-date'>{props.createdAt}</p>
        </div>
        <p className='comment-message'>
          <span className='mention'>@{props.replyingTo}</span> {props.content}
        </p>
        <div className='comment-info'>
          <div className='comment-rate'>
            <img onClick={increaseScore} src='../images/icon-plus.svg' />
            <p>{score}</p>
            <img onClick={decreaseScore} src='../images/icon-minus.svg' />
          </div>
          {props.currentUser ? (
            <div className='comment-edit'>
              <span>
                <img src='../images/icon-delete.svg' />
                <span
                  className='comment-edit-delete'
                  onClick={props.handleDelete}
                >
                  Delete
                </span>
              </span>
              <span>
                <img src='../images/icon-edit.svg' />
                <span className='comment-edit-edit' onClick={props.handleEdit}>
                  Edit
                </span>
              </span>
            </div>
          ) : (
            <div className='comment-edit'>
              <div>
                <img src='../images/icon-reply.svg' />
                <span
                  className='comment-edit-reply'
                  onClick={props.handleReply}
                >
                  Reply
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
