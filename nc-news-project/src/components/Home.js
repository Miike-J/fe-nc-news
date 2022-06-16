import { useState, useEffect } from "react"
import {getArticles, getTopics} from '../api'
import {Link} from 'react-router-dom'
import moment from 'moment'
import PropgateLoader from 'react-spinners/PropagateLoader'
import Select from 'react-select'

const Home = () => {
    let [articleList, setArticleList] = useState([{}])
    const [isLoading, setIsLoading] = useState(true)
    const [topicList, setTopicList] = useState([{}])
    const [topicSelect, setTopicSelect] = useState('')
    const [sortList, setSortList] = useState([{}])
    const [sortSelect, setSortSelect] = useState('')
    

   useEffect(() => {
    getArticles(topicSelect, sortSelect).then(data => {
        data.articles.map(article => {
            let str = article.created_at
            let date = moment(str).format("l")
            return article.created_at = date
        })
        
        setArticleList(data.articles)
        setIsLoading(false)

    })
   }, [articleList])

   //Get topic list 
   useEffect(() => {
    getTopics().then(data => {
        setTopicList(data.topics.map(topic => {
            if(topic.slug){
               return {value: topic.slug, label: (topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1))} 
            } else {
                return topic
            }
        }))
    })
    setSortList([{value: 'date', label: 'Date: Oldest to newest'}, {value: 'votes&order=desc', label:'Votes: Higest'}, {value: 'votes&order=asc', label: 'Votes: Lowest'}, {value: 'author&order=asc', label: 'Author: A-Z'}, {value: 'author', label: 'Author: Z-A'}])
   }, [])

   //handle which topic has been selected 
   const handleTopicSelectChange = (selectedOption) => {
    setTopicSelect((currTopic) => {
        if(!selectedOption){
            return currTopic = ''
        } else {
            return currTopic = selectedOption.value
        }
    })
   }

   const handleSortSelectChange = (selectedOption) => {
       setSortSelect((currTopic) => {
           if(!selectedOption){
               return currTopic = ''
           } else {
               if(selectedOption.value !== 'date') {
                return currTopic = selectedOption.value 
               } else if (selectedOption.value === 'date') {
                return currTopic = 'created_at&order=asc'
               } 
           }
       })
   }

   const style = {position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }

   if(isLoading) return <div style={style}><PropgateLoader /></div>
    return (
        <>
        <ul className="article-list">
            {/*drop down to select which topic to sort for*/}
            <Select 
            className="topic-select"
            isClearable={true}
            isSearchable={true}
            name='topic'
            placeholder='Topic...'
            options={topicList}
            onChange={handleTopicSelectChange}
            />
            <Select 
            className="sort-select"
            isClearable={true}
            isSearchable={true}
            name='sort'
            placeholder='Date: Newest to Oldest'
            options={sortList}
            onChange={handleSortSelectChange}
            />
            {articleList.map(article => {
                return (
                    <li className="single-article" key={article.article_id}>
                    <p id="article-topic">Topic: <span>{article.topic}</span></p>
                    <p id="article-date">{article.created_at}</p>
                    <p id="article-title"><Link to={`/article/${article.article_id}`}>{article.title}</Link></p>
                    <p id="article-author">By: <span>{article.author}</span></p>
                    <p id="article-votes">Votes: {article.votes}</p>
                    <p id="article-comments">Comments: {article.comment_count}</p>
                    </li>    
                )
            })}
        </ul>
        </>
    )
}

export default Home