const axios = require('axios')

exports.getArticles = () => {
    return axios.get('https://nc-news-project-app.herokuapp.com/api/articles').then(({data}) => {
        return data
    })
}


