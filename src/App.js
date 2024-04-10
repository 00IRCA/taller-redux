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
  return (
    <div className="App">
      <AppContext.Provider value={{user}}>
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
