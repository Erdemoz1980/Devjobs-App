import React, { useState } from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Navbar from './components/Navbar';
import JobDetailsPage from './pages/JobDetailsPage';


const App: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <main className={`main-wrapper ${isDarkTheme ? 'dark-theme' : ''}`}>
      <Navbar isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />
        <Routes>
          <Route path='/' element={<MainPage isDarkTheme={isDarkTheme} />} />
          <Route path='/jobdetails/:id' element={<JobDetailsPage isDarkTheme={isDarkTheme} />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
};

export default App