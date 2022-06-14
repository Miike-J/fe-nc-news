import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getSingleArticle } from "../api"
import moment from "moment"
import PropgateLoader from 'react-spinners/PropagateLoader'

const SingleArticle = () => {
    const [articleArr, setArticleArr] = useState([{}])
    const {article_id} = useParams()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getSingleArticle(article_id).then(data => {
            [data].map(article => {
                let str = article.created_at
                let date = moment(str).format("l")
                return article.created_at = date
            })
            setArticleArr([data])
            setIsLoading(false)
        })
    }, [articleArr, article_id])

    const style = {position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }

   if(isLoading) return <div style={style}><PropgateLoader /></div>
    return (
        <>
        <ul className="article-list">
            {articleArr.map(article => {
               return (
               <li className="article-item" key={`article ${article.article_id}`}>
                    <p id="article-topic">Topic: <span>{article.topic}</span></p>
                    <p id="article-date">{article.created_at}</p>
                    <p id="article-title">{article.title}</p>
                    <p id="article-author">By: <span>{article.author}</span></p>
                    <p id="article-body">{article.body}</p>
                    <p id="article-votes">Votes: {article.votes}</p>
                    <p id="article-comments">Comments: {article.comment_count}</p>
                </li>
                )
            })}
        </ul>
        </>
    )
}

export default SingleArticle