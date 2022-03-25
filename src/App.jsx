import React from 'react'
import Comment from '../components/Comment'
import Reply from '../components/Reply'
import AddComment from '../components/AddComment'
import '../style.css'
import dataJSON from '../data.json'
import { nanoid } from 'nanoid'

export default function App() {
  const [commentText, setCommentText] = React.useState('')
  const [model, setModel] = React.useState(false)
  const [data, setData] = React.useState(dataJSON)
  const [addReply, setAddReply] = React.useState(false)

  function handleTextarea(e) {
    setCommentText(e.target.value)
  }

  function handleDelete() {
    setModel(true)
  }
  function handleEdit(e) {
    console.log(e)
  }
  function handleReply(e) {
    setAddReply(!addReply)
    setData((prevData) => {
      return {
        ...prevData,
        comments: prevData.comments.map((comment) => {
          return comment.id === e.id
            ? { ...comment, reply: !addReply }
            : {
                ...comment,
                replies: comment.replies.map((commentReply) => {
                  return commentReply.id === e.id
                    ? { ...commentReply, reply: !addReply }
                    : commentReply
                }),
              }
        }),
      }
    })
  }

  function addComment(e) {
    const time = new Date().toDateString().split(' ')
    setData((prevData) => {
      return {
        ...prevData,
        comments: [
          ...prevData.comments,
          {
            id: nanoid(),
            content: commentText,
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

  function createReply(e) {
    const time = new Date().toDateString().split(' ')
    console.log(e)
    setData((prevData) => {
      return {
        ...prevData,
        comments: prevData.comments.map((comment) => {
          return comment.id === e.id
            ? {
                ...comment,
                ...(comment.reply = true),
                ...comment.replies.push({
                  id: nanoid(),
                  content: commentText,
                  createdAt: `${time[1]} ${time[2]} ${time[3]}`,
                  score: 0,
                  replyingTo: e.user.username,
                  user: {
                    image: {
                      png: './images/avatars/image-juliusomo.png',
                      webp: './images/avatars/image-juliusomo.webp',
                    },
                    username: 'juliusomo',
                  },
                  replies: [],
                }),
              }
            : comment
        }),
      }
    })
    setAddReply(false)
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
        {comment.reply === true && (
          <AddComment
            textarea_placeholder={'Reply'}
            handleTextarea={handleTextarea}
            comment={commentText}
            handleComment={() => createReply(comment)}
            currentUser={currentUserImg}
          />
        )}
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
                  {reply.reply === true && (
                    <AddComment
                      textarea_placeholder={'Reply'}
                      handleTextarea={handleTextarea}
                      comment={commentText}
                      handleComment={() => createReply(reply)}
                      currentUser={currentUserImg}
                    />
                  )}
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
      <AddComment
        textarea_placeholder={'Add a comment..'}
        handleTextarea={handleTextarea}
        comment={commentText}
        handleComment={() => addComment()}
        currentUser={currentUserImg}
      />
    </div>
  )
}
