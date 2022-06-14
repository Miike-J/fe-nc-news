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



