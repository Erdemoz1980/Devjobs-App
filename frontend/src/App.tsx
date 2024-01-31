import React, { useContext } from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Navbar from './components/Navbar';
import JobDetailsPage from './pages/JobDetailsPage';
import { GlobalProvider, GlobalContext } from './context/GlobalState';


const App: React.FC = () => {
  const { isDarkTheme } = useContext(GlobalContext);

  return (
    <GlobalProvider>
    <BrowserRouter>
      <main className={`main-wrapper ${isDarkTheme ? 'dark-theme' : ''}`}>
      <Navbar />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/jobdetails/:id' element={<JobDetailsPage />} />
        </Routes>
      </main>
      </BrowserRouter>
      </GlobalProvider>
  )
};

export default App