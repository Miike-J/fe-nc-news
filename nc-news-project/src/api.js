const axios = require('axios')


exports.getArticles = (topicSelect) => {
    //change url for .get if a topic is selected
    let url = 'https://nc-news-project-app.herokuapp.com/api/articles'
    if(topicSelect) {
        url += `?topic=${topicSelect}`
    }
    return axios.get(url).then(({data}) => {
        return data
    })
}

exports.getTopics = () => {
    return axios.get('https://nc-news-project-app.herokuapp.com/api/topics').then(({data}) => {
        return data 
    })
}

exports.getSingleArticle = (article_id) => {
    return axios.get(`https://nc-news-project-app.herokuapp.com/api/articles/${article_id}`).then(data => {
        return data.data.article
    }).catch(console.dir)
}

exports.updateVotes = (article_id, num) => {
    return axios.patch(`https://nc-news-project-app.herokuapp.com/api/articles/${article_id}`, {inc_votes: num})
}

exports.getArticleComments = (article_id) => {
    return axios.get(`https://nc-news-project-app.herokuapp.com/api/articles/${article_id}/comments`).then(data => {
        return data.data.comments
    })
}

exports.getUsers = () => {
    return axios.get('https://nc-news-project-app.herokuapp.com/api/users').then(data => {
        return data.data.users
    })
}

exports.postComment = (commentObj, article_id) => {
    return axios.post(`https://nc-news-project-app.herokuapp.com/api/articles/${article_id}/comments`, commentObj).then(data => {
        return data.data.comment
    }).catch(console.dir)
}

