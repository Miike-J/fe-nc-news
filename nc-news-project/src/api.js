const axios = require('axios')


exports.getArticles = (topicSelect, sortSelect) => {
    //change url for .get if a topic is selected
    let url = 'https://app-f2462bfb-8127-4237-8fc8-3e894771b534.cleverapps.io/api/articles'
    if(topicSelect && sortSelect.length === 0) {
        url += `?topic=${topicSelect}`
    } else if (sortSelect && topicSelect.length === 0) {
        url += `?sort_by=${sortSelect}`
    }

    return axios.get(url).then(({data}) => {
        return data
    })
}

exports.getTopics = () => {
    return axios.get('https://app-f2462bfb-8127-4237-8fc8-3e894771b534.cleverapps.io/api/topics').then(({data}) => {
        return data 
    })
}

exports.getSingleArticle = (article_id) => {
    return axios.get(`https://app-f2462bfb-8127-4237-8fc8-3e894771b534.cleverapps.io/api/articles/${article_id}`).then(data => {
        return data.data.article
    })
}

exports.updateVotes = (article_id, num) => {
    return axios.patch(`https://app-f2462bfb-8127-4237-8fc8-3e894771b534.cleverapps.io/api/articles/${article_id}`, {inc_votes: num})
}

exports.getArticleComments = (article_id) => {
    return axios.get(`https://app-f2462bfb-8127-4237-8fc8-3e894771b534.cleverapps.io/api/articles/${article_id}/comments`).then(data => {
        return data.data.comments
    })
}

exports.getUsers = () => {
    return axios.get('https://app-f2462bfb-8127-4237-8fc8-3e894771b534.cleverapps.io/api/users').then(data => {
        return data.data.users
    })
}

exports.postComment = (commentObj, article_id) => {
    return axios.post(`https://app-f2462bfb-8127-4237-8fc8-3e894771b534.cleverapps.io/api/articles/${article_id}/comments`, commentObj).then(data => {
        return data.data.comment
    }).catch(console.dir)
}

exports.deleteComment = (comment_id) => {
    return axios.delete(`https://app-f2462bfb-8127-4237-8fc8-3e894771b534.cleverapps.io/api/comments/${comment_id}`)
}
