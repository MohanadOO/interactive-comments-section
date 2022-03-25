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
        <div className='comment flex-desktop'>
          <div className='comment-rate comment-rate-flex-column'>
            <img onClick={increaseScore} src='../images/icon-plus.svg' />
            <p>{score}</p>
            <img onClick={decreaseScore} src='../images/icon-minus.svg' />
          </div>
          <div>
            <div className='user-info'>
              <img className='user-logo' src={props.image} />
              <p className='user-name'>{props.username}</p>
              {props.currentUser && <p className='you-card'>you</p>}
              <p className='comment-date'>{props.createdAt}</p>
              {props.currentUser ? (
                <div className='comment-edit hide'>
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
                <div className='comment-edit hide'>
                  <div onClick={props.handleReply}>
                    <img src='../images/icon-reply.svg' />
                    <span className='comment-edit-reply'>Reply</span>
                  </div>
                </div>
              )}
            </div>
            <p className='comment-message'>
              <span className='mention'>@{props.replyingTo}</span>{' '}
              {props.content}
            </p>
            <div className='comment-info'>
              <div className='comment-rate show-flex'>
                <img onClick={increaseScore} src='../images/icon-plus.svg' />
                <p>{score}</p>
                <img onClick={decreaseScore} src='../images/icon-minus.svg' />
              </div>
              {props.currentUser ? (
                <div className='comment-edit show'>
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
                <div className='comment-edit show'>
                  <div onClick={props.handleReply}>
                    <img src='../images/icon-reply.svg' />
                    <span className='comment-edit-reply'>Reply</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
