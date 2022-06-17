import './App.css';
import Header from './components/Header';
import Nav from './components/Nav'
import Home from './components/Home';
import UserList from './components/UserList';
import SingleArticle from './components/SingleArticle';
import NoPath from './components/NoPath';
import { Route, Routes } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import { useState } from 'react';
import userImage from './userImage.png'


function App() {

  const [userObj, setUserObj] = useState({username: 'tickle122', user_id: 1, img: userImage})


  return (
    <>
    <UserContext.Provider value={{userObj: userObj, setUserObj: setUserObj}}>
    <Header />
    <Nav />
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/article/:article_id' element={<SingleArticle />}></Route>
      <Route path='/users' element={<UserList />}></Route>
      <Route path ='/*' element={<NoPath/>}></Route>
    </Routes>
    </UserContext.Provider>
    </>
  );
}

export default App;
