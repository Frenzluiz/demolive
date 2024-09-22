import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home';
import PlayerList from './Components/PlayerList';
import AddPlayer from './Components/AddPlayer';
import EditPlayer from './Components/EditPlayer';
import "./App.css";


const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <Router>
      <div className={isDarkMode ? 'dark-mode app-container' : 'app-container'}>
        <Header toggleDarkMode={toggleDarkMode} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/players" element={<PlayerList />} />
            <Route path="/add-player" element={<AddPlayer />} />
            <Route path="/edit-player/:id" element={<EditPlayer />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;