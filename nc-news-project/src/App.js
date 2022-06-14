import './App.css';
import Header from './components/Header';
import Nav from './components/Nav'
import Home from './components/Home';
import UserList from './components/UserList';
import SingleArticle from './components/singleArticle';
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <>
    <Header />
    <Nav />
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/article/:article_id' element={<SingleArticle />}></Route>
      <Route path='/users' element={<UserList />}></Route>
    </Routes>
    </>
  );
}

export default App;
