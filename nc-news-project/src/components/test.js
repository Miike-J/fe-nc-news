import axios from 'axios'

const Test = () => {
    axios.get('https://nc-news-project-app.herokuapp.com/api/articles').then(({data}) => {
        console.log(data)
    })
    .then(axios.get('https://nc-news-project-app.herokuapp.com/api/articles/34').then(({data}) => {
        console.log(data)
    }))
    .then(axios.get('https://nc-news-project-app.herokuapp.com/api/topics').then(({data}) => {
        console.log(data)
    }))
    .then(axios.get('https://nc-news-project-app.herokuapp.com/api/users').then(({data}) => {
        console.log(data)
    }))
    .then(axios.get('https://nc-news-project-app.herokuapp.com/api/articles/34/comments').then(({data}) => {
        console.log(data)
    }))
}



export default Test 
