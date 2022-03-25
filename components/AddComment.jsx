import React from 'react'

function AddComment(props) {
  return (
    <div className='add-comment'>
      <textarea
        placeholder={props.textarea_placeholder}
        value={props.textarea_value}
        onInput={props.handleTextarea}
      >
        {props.comment}
      </textarea>
      <div className='send-info'>
        <img className='author-logo' src={props.currentUser} />
        <button onClick={props.handleComment} className='send-btn'>
          Send
        </button>
      </div>
    </div>
  )
}

export default AddComment
