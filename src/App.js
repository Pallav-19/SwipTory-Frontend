/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Box } from '@mui/material';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ViewStory from './components/ViewStory';
import { useDispatch, useSelector } from 'react-redux';
import { currentStory, setStory } from './features/storySlice';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLogoutMutation, useRefreshMutation } from './features/api/authApiSlice';
import { currentUser, logout as logoutAction, setCredentials } from './features/authSlice';
import RequireAuth from './app/guards/RequireAuth';
import Bookmarks from './components/Bookmarks';
import Notifications from './components/miscellaneous/notifications/Notifications';
import { useGetStoryByIdMutation } from './features/api/storyApiSlice';
import Loader from './components/miscellaneous/Loader';
import EditModal from './components/EditModal';
function App() {
  const story = useSelector(currentStory)
  const user = useSelector(currentUser)
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const [refresh] = useRefreshMutation()
  const [isLoading, setLoading] = useState(false)
  const [getStoryById] = useGetStoryByIdMutation()
  const [logout] = useLogoutMutation()
  useEffect(() => {

    const fetch = async () => {
      try {
        setLoading(true)
        const response = await refresh()
        if (!response.data.token) {
          logout()
          return dispatch(logoutAction())
        }
        dispatch(setCredentials({ user: response.data.user, token: response.data.token }))
      } catch (error) {

      } finally {

        setLoading(false)
      }
    }
    fetch()
  }, [])
  useEffect(() => {
    const fetch = async (id) => {
      const { data } = await getStoryById({ id })
      if (data) {
        dispatch(setStory(data?.story))
      }
    }
    if (searchParams.get('story')) {
      fetch(searchParams.get('story').toString())
    }
  }, [searchParams])
  if (isLoading) return (<Loader />)
  return (
    <>
      {!isLoading && <Box >

        <Navbar />
        <Notifications />
        <EditModal />
        {(story || searchParams.get('story')) && <ViewStory />}
        <Routes>
          <Route path="/" exact index element={<Home />} />
          <Route element={<RequireAuth />} >
            <Route path='/bookmarks' element={<Bookmarks />} />
          </Route>

        </Routes>


      </Box>}
    </>
  );
}

export default App;
