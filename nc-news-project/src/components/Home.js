import { useState, useEffect } from "react"
import {getArticles} from '../api'
import {Link} from 'react-router-dom'
import moment from 'moment'
import PropgateLoader from 'react-spinners/PropagateLoader'

const Home = () => {
    const [articleList, setArticleList] = useState([{}])
    const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
    getArticles().then(data => {
        data.articles.map(article => {
            let str = article.created_at
            let date = moment(str).format("l")
            return article.created_at = date
        })
        setArticleList(data.articles)
        setIsLoading(false)
    })
   }, [articleList])

   const style = {position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }

   if(isLoading) return <div style={style}><PropgateLoader /></div>
    return (
        <ul className="article-list" key='article-list'>
            {articleList.map(article => {
                return (
                    <div className="single-article" >
                    <li id="article-topic">Topic: {article.topic}</li>
                    <li id="article-date">{article.created_at}</li>
                    <li id="article-title"><Link to='/'>{article.title}</Link></li>
                    <li id="article-author">By: {article.author}</li>
                    <li id="article-votes">Votes: {article.votes}</li>
                    <li id="article-comments">Comments: {article.comment_count}</li>
                    </div>    
                )
            })}
        </ul>
    )
}

export default Home