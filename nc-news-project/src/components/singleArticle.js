import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getSingleArticle, updateVotes, getArticleComments } from "../api"
import moment from "moment"
import PropgateLoader from 'react-spinners/PropagateLoader'

const SingleArticle = () => {
    const [article, setArticle] = useState({})
    const {article_id} = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [voteChange, setVoteChange] = useState(0)
    const [votes, setVotes] = useState(0)
    const [commentList, setCommentList] = useState(({}))

    useEffect(() => {
        getSingleArticle(article_id).then(article => {
            
            let artDate = article.created_at
            article.date = moment(artDate).format("l")
            setArticle(article)
            setVotes(article.votes)
        })
        getArticleComments(article_id).then(comments => {
            comments.map(article => {
                let str = article.created_at
                let date = moment(str).format("l")
                return article.created_at = date
            })
            setCommentList(comments)
            setIsLoading(false)
        })
    }, [])

    const handleUpVote = () => {
        setVoteChange(currVote => currVote + 1)
        updateVotes(article_id, 1).catch(() => {setVoteChange(currVote => currVote - 1)})
    }

    const handleDownVote = () => {
        setVoteChange(currVote => currVote - 1)
        updateVotes(article_id, -1).catch(() => {setVoteChange(currVotes => currVotes + 1)})
    }

    const style = {position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }

   if(isLoading) return <div style={style}><PropgateLoader /></div>
    return (
        <>
        <ul className="article-list">
               <li className="article-item" key={`article ${article.article_id}`}>
                    <p id="article-topic">Topic: <span>{article.topic}</span></p>
                    <p id="article-date">{article.date}</p>
                    <p id="article-title">{article.title}</p>
                    <p id="article-author">By: <span>{article.author}</span></p>
                    <p id="article-body">{article.body}</p>

                    <p id="article-votes"> 
                    <button id="vote-button" onClick={handleUpVote} disabled={voteChange>0}>{'+'}</button>
                    Votes: {votes + voteChange}
                    <button id="vote-button" onClick={handleDownVote} disabled={voteChange < 0}>{'-'}</button></p>

                    <p id="article-comments">Comments: {article.comment_count}</p>
                </li>
        </ul>
        <h3 id="comment-title">Comments</h3>
        <ul className="comment-list">
            {commentList.map(comment => {
                return (
                    <li className="comment-item" key={comment.comment_id}>
                        <p id='comment-author'>By: <span>{comment.author}</span></p>
                        <p id='comment-date'>{comment.created_at}</p>
                        <p id='comment-body'>{comment.body}</p>
                        <p id='comment-votes'>Votes: {comment.votes}</p>
                    </li>
                )
            })}
        </ul>
        </>
    )
}

export default SingleArticle