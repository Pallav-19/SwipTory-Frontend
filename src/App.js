/* eslint-disable no-unused-vars */
import { Box } from '@mui/material';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ViewStory from './components/ViewStory';
import { useSelector } from 'react-redux';
import { currentStory } from './features/storySlice';
import { useSearchParams } from 'react-router-dom';
function App() {
  const story = useSelector(currentStory)
  const [searchParams, setSearchParams] = useSearchParams()
  return (
    <Box >
      <Navbar />
      <Home />
      {(story || searchParams.get('story')) && <ViewStory />}

    </Box>
  );
}

export default App;
