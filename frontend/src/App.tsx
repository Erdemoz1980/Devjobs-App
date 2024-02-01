import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Navbar from './components/Navbar';
import JobDetailsPage from './pages/JobDetailsPage';
import { GlobalProvider} from './context/GlobalState';


const App: React.FC = () => {

  return (
    <GlobalProvider>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/jobdetails/:id' element={<JobDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
};

export default App