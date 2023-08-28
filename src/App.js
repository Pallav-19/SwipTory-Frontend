/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Box } from '@mui/material';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ViewStory from './components/ViewStory';
import { useDispatch, useSelector } from 'react-redux';
import { currentStory } from './features/storySlice';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRefreshMutation } from './features/api/authApiSlice';
import { currentUser, setCredentials } from './features/authSlice';
import RequireAuth from './app/guards/RequireAuth';
import Bookmarks from './components/miscellaneous/Bookmarks';
function App() {
  const story = useSelector(currentStory)
  const user = useSelector(currentUser)
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const [refresh] = useRefreshMutation()
  const [isLoading, setLoading] = useState(false)
  useEffect(() => {

    const fetch = async () => {
      setLoading(true)
      const response = await refresh()
      dispatch(setCredentials({ user: response.data.user, token: response.data.token }))
      setLoading(false)
    }
    fetch()
  }, [])
  if (isLoading) return (<p>loading...</p>)
  return (
    <Box >

      <Navbar />
      {(story || searchParams.get('story')) && <ViewStory />}
      <Routes>
        <Route path="/" exact index element={<Home />} />
        <Route element={<RequireAuth />} >
          <Route  path='/bookmarks' element={<Bookmarks />} />
        </Route>

      </Routes>


    </Box>
  );
}

export default App;
