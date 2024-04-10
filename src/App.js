import './App.css';
import { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Root from './Pages/Root';
import ProfilePage from './Pages/ProfilePage';
import HomePage from './Pages/HomePage';
import PostsContainer from './Components/PostsContainer';
import ListsContainer from './Components/ListsContainer';
import FriendsPage from './Pages/FriendsPage';
import SecretPage from './Pages/SecretPage';
import CreateListPage from './Pages/CreateListPage';
import ListsPage from './Pages/ListsPage';
import CreatePostPage from './Pages/CreatePostPage';

export const AppContext = createContext(null);

function App() {
  const [user, setuser] = useState({id: 6, name: "Ismael"})
  const [lists, setLists] = useState({})
  const [posts, setPosts] = useState({})
  const [filter, setFilter] = useState(false)
  const [isPostAdded, setIsPostAdded] = useState(false)
  const [isListAdded, setIsListAdded] = useState(false)

  function addList(list) {
    //check if list name
    if(list.name.length){
      setLists({
        ...lists, 
        [user.id]: {
          ...lists[user.id], [list.id]: list
        }})
    }
    setIsListAdded(true)
  }

  function addPost(post) {
    //check if list name
      setPosts({
        ...posts, 
        [user.id]: [
          post,
          ...(posts[user.id] ? posts[user.id] : []),
        ]})
        setIsPostAdded(true)
    }

  return (
    <div className="App">
      <AppContext.Provider value={{user, addList, lists, setLists, filter, setFilter, posts, setPosts, addPost, isListAdded, isPostAdded, setIsListAdded, setIsPostAdded}}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Root />}>
              <Route path='/' element={<HomePage />} />
              <Route path='/profile/:id' element={<ProfilePage />}>
                <Route path='/profile/:id/posts' element={<PostsContainer />}/>
                <Route path='/profile/:id/lists/:listId?' element={<ListsContainer />} />
              </Route>
              <Route path='/secret' element={<SecretPage />} />
              <Route path='/friends' element={<FriendsPage />} />
              <Route path='/createPost' element={<CreatePostPage />} />
              <Route path='/createlist/:listId?' element={<CreateListPage />} />
              <Route path='/editLists/:id' element={<ListsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;
