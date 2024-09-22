import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ toggleDarkMode, isDarkMode }) => {
    return (
        <header className="header">
            <h1>Football Player Search</h1>
            <button onClick={toggleDarkMode}>
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/players">Players</Link></li>
                    <li><Link to="/add-player">Add Player</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
