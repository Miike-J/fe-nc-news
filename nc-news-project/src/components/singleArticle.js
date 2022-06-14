import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getSingleArticle } from "../api"

const SingleArticle = () => {
    const [articleArr, setArticleArr] = useState([{}])
    const {article_id} = useParams()

    useEffect(() => {
        getSingleArticle(article_id).then(data => {
            setArticleArr([data])
        })
    }, [articleArr, article_id])

   

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