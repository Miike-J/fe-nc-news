import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { getSingleArticle, updateVotes, postComment, getArticleComments, deleteComment} from "../api"
import moment from "moment"
import PropgateLoader from 'react-spinners/PropagateLoader'
import { UserContext } from "../contexts/UserContext"


const SingleArticle = () => {
    const [article, setArticle] = useState({})
    const {article_id} = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [voteChange, setVoteChange] = useState(0)
    const [votes, setVotes] = useState(0)
    const [commentList, setCommentList] = useState([{}])
    const {userObj} = useContext(UserContext)
    const [newCommentCheck, setNewCommentCheck] = useState(false)
    const [newComment, setNewComment] = useState('')
    const [articleError, setArticleError] = useState('')
    const [deleteError, setDeleteError] = useState([{}])

    useEffect(() => {
        getSingleArticle(article_id).then(article => {

            let artDate = article.created_at
            article.date = moment(artDate).format("l")
            setArticle(article)
            setVotes(article.votes)
        }).catch(err => {
            setIsLoading(false)
            setArticleError(err.message)
        }
        )
        getArticleComments(article_id).then(comments => {
            comments.map(comment => {
                let str = comment.created_at
                let date = moment(str).format("l")
                return comment.created_at = date
        })
            setCommentList(comments)
        })
        setIsLoading(false)
    }, [])

    const handleUpVote = () => {
        setVoteChange(currVote => currVote + 1)
        updateVotes(article_id, 1).catch(() => {setVoteChange(currVote => currVote - 1)})
    }

    const handleDownVote = () => {
        setVoteChange(currVote => currVote - 1)
        updateVotes(article_id, -1).catch(() => {setVoteChange(currVotes => currVotes + 1)})
    }

    const handleNewComment = () => {
        setNewCommentCheck((currVal) => !currVal)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const commentCheck = document.getElementById('new-commentInput')
        if(newComment.length !== 0) {
            commentCheck.placeholder = "Type..."
            const commentObj = {username: userObj.username, body: newComment}
            postComment(commentObj, article_id).then(data => {
            let newCommStr = data.created_at
            let newCommDate = moment(newCommStr).format("l")
            data.created_at = newCommDate

            setCommentList(currComm => [...currComm, data])
        })
        } else {
            commentCheck.placeholder = "Can't leave blank..."
        }
       
        setNewComment('')
    }   

    const handleDeleteClick = (comment_id) => {
        setDeleteError(commentList)
        setCommentList(commentList.filter(comment => {
            return comment.comment_id !== comment_id
        }))
        deleteComment(comment_id).catch(() => {setCommentList(deleteError)})
    }

    const style = {position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }

   if(isLoading) return <div style={style}><PropgateLoader /></div>
   if(articleError) return <p className="error-msg">{articleError + '. Press home button to return.'}</p>
    return (
        <>
        <ul className="article-background">
               <li className="article-item" key={`article ${article.article_id}`}>
                    <p id="article-topic">Topic: <span>{article.topic}</span></p>
                    <p id="article-date">{article.date}</p>
                    <p id="article-title">{article.title}</p>
                    <p id="article-author">By: <span>{article.author}</span></p>
                    <p id="article-body">{article.body}</p>

                    <p id="article-votes"> 
                    <button id="vote-button" onClick={handleUpVote} disabled={voteChange>0 || userObj.username === article.author}>{'+'}</button>
                    Votes: {votes + voteChange}
                    <button id="vote-button" onClick={handleDownVote} disabled={voteChange < 0 || userObj.username === article.author}>{'-'}</button></p>

                    <p id="article-comments">Comments: {article.comment_count}</p>
                </li>
        </ul>

        <div className="article-break">
        <h3 id="comment-title">Comments</h3>
        <button id="new-commentButton" disabled={userObj.username === article.author} onClick={handleNewComment}>New Comment</button>
        </div>
        {newCommentCheck && (
            <form className="new-comment" onSubmit={handleSubmit}>
                <input 
                id="new-commentInput" 
                autoComplete="off" 
                onChange={(e) => {
                    setNewComment(e.target.value)
                }} 
                placeholder="Type..."
                value={newComment}>
                </input>
                <input 
                id="new-commentSubmit" 
                type='button' 
                value='Submit'
                onClick={handleSubmit}
                disabled={newComment.length === 0} >
                </input>
            </form>
        )}
        <ul className="comment-list">
            {commentList.map(comment => {
                return (
                    <li className="comment-item" key={comment.comment_id}>
                        <p id='comment-author'>By: <span>{comment.author}</span></p>
                        <p id='comment-date'>{comment.created_at}</p>
                        <p id='comment-body'>{comment.body}</p>
                        <p id='comment-votes'>Votes: {comment.votes}</p>
                        {userObj.username === comment.author && (
                            <button 
                            id="delete-button" 
                            onClick={() => {
                                handleDeleteClick(comment.comment_id)
                            }}>Delete</button>
                        )}
                    </li>
                )
            }).reverse()}
        </ul> 
        </>
    )
}

export default SingleArticle