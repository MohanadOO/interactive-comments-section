import React from 'react'
import Comment from '../components/Comment'
import Reply from '../components/Reply'
import '../style.css'
import dataJSON from '../data.json'

export default function App() {
  const [comment, setComment] = React.useState('')
  const [model, setModel] = React.useState(false)
  const [data, setData] = React.useState(dataJSON)

  function handleTextarea(e) {
    setComment(e.target.value)
  }

  function handleDelete() {
    setModel(true)
  }
  function handleEdit(e) {
    console.log(e)
  }
  function handleReply(e) {
    console.log(e)
  }

  function addComment() {
    const time = new Date().toDateString().split(' ')
    console.log(comment)
    setData((prevData) => {
      return {
        ...prevData,
        comments: [
          ...prevData.comments,
          {
            id: 10,
            content: comment,
            createdAt: `${time[1]} ${time[2]} ${time[3]}`,
            score: 0,
            user: {
              image: {
                png: './images/avatars/image-juliusomo.png',
                webp: './images/avatars/image-juliusomo.webp',
              },
              username: 'juliusomo',
            },
            replies: [],
          },
        ],
      }
    })
  }

  function deleteComment(e) {
    //searching for the exact comment or reply that is selected to be delete.
    //if the ID don't match the ID of the selected comment then it will not be deleted
    const filterComment = data.comments
      .filter((item) => {
        return item.id !== e.id
      })
      .filter((i) => {
        //Filter the replies for each comment to look if the current user want to delete his reply
        const replies = i.replies.filter((reply) => {
          return reply.id !== e.id
        })
        //After filtering each reply to look if the ID match the selected ID we will return the replies into each comment.
        return (i.replies = replies)
      })

    setData((prevData) => {
      return {
        ...prevData,
        comments: filterComment,
      }
    })
    setModel(false)
  }

  const currentUserImg = data.currentUser.image.png
  const comments = data.comments.map((comment) => {
    return (
      <>
        {model && (
          <div className='model-div'>
            <dialog open={model} id='model'>
              <h2>Delete comment</h2>
              <p>
                Are you sure you want to delete this comment? This will remove
                the comment and can't be undone
              </p>
              <div className='flex'>
                <button className='no-delete' onClick={() => setModel(false)}>
                  No, cancel
                </button>
                <button
                  className='yes-delete'
                  onClick={() => deleteComment(comment)}
                >
                  Yes, Delete
                </button>
              </div>
            </dialog>
          </div>
        )}
        <Comment
          counter={comment.score}
          content={comment.content}
          createdAt={comment.createdAt}
          username={comment.user.username}
          currentUser={comment.user.username === data.currentUser.username}
          image={comment.user.image.png}
          handleDelete={handleDelete}
          handleEdit={() => handleEdit(comment)}
          handleReply={() => handleReply(comment)}
        />
        {comment.replies.length >= 1 ? (
          <>
            {comment.replies.map((reply) => {
              return (
                <>
                  {model && (
                    <div className='model-div'>
                      <dialog open={model} id='model'>
                        <h2>Delete comment</h2>
                        <p>
                          Are you sure you want to delete this comment? This
                          will remove the comment and can't be undone
                        </p>
                        <div className='flex'>
                          <button
                            className='no-delete'
                            onClick={() => setModel(false)}
                          >
                            No, cancel
                          </button>
                          <button
                            className='yes-delete'
                            onClick={() => deleteComment(reply)}
                          >
                            Yes, Delete
                          </button>
                        </div>
                      </dialog>
                    </div>
                  )}
                  <Reply
                    replyingTo={reply.replyingTo}
                    counter={reply.score}
                    content={reply.content}
                    createdAt={reply.createdAt}
                    username={reply.user.username}
                    image={reply.user.image.png}
                    currentUser={
                      reply.user.username === data.currentUser.username
                    }
                    handleDelete={handleDelete}
                    handleEdit={() => handleEdit(reply)}
                    handleReply={() => handleReply(reply)}
                  />
                </>
              )
            })}
          </>
        ) : (
          ''
        )}
      </>
    )
  })

  return (
    <div className='app'>
      {comments}
      <div className='add-comment'>
        <textarea placeholder='Add a comment..' onInput={handleTextarea}>
          {comment}
        </textarea>
        <div className='send-info'>
          <img className='author-logo' src={currentUserImg} />
          <button onClick={addComment} className='send-btn'>
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
