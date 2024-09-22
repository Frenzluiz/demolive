import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { fetchPlayers, deletePlayer } from '../Services/PlayerService';
import PlayerCard from './PlayerCard';

const PlayerList = () => {
    const [players, setPlayers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Function to fetch players
    const getPlayers = async (search, sort, pageNum) => {
        setLoading(true);
        try {
            const data = await fetchPlayers(search, sort, pageNum);
            setPlayers(data.data || []);
            setTotalPages(data.last_page || 1);
        } catch (err) {
            setError('Error fetching players. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Function to delete a player
    const handleDelete = async (playerId) => {
        try {
            await deletePlayer(playerId);
            setPlayers((prevPlayers) => prevPlayers.filter(player => player.id !== playerId));
        } catch (err) {
            console.error('Error deleting player:', err);
        }
    };

    // Debounced search
    const debouncedSearch = debounce((searchTerm, sortBy) => {
        setPage(1);
        setPlayers([]);
        getPlayers(searchTerm, sortBy, 1);
    }, 300);

    // useEffect for search input change
    useEffect(() => {
        debouncedSearch(searchTerm, sortBy);
    }, [searchTerm, sortBy]);

    // Fetch players on page change or sort change
    useEffect(() => {
        getPlayers(searchTerm, sortBy, page);
    }, [sortBy, page]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (e) => {
        setSortBy(e.target.value);
    };

    const nextPage = () => {
        if (page < totalPages) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const prevPage = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div className="player-list-container">
            <h1 className="heading">Player List</h1>
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search by name, club, or nationality"
                value={searchTerm}
                onChange={handleSearch}
                className="search-bar" // Add a class for styling
            />
            {/* Sorting */}
            <select value={sortBy} onChange={handleSort}>
                <option value="name">Sort by Name</option>
                <option value="club">Sort by Club</option>
                <option value="nationality">Sort by Nationality</option>
            </select>

            {/* Loading/Error Message */}
            {loading ? (
                <p>Loading players...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="player-cards">
                    {players.length > 0 ? (
                        players.map((player) => (
                            <PlayerCard
                                key={player.id}
                                player={player}
                                handleDelete={handleDelete}
                            />
                        ))
                    ) : (
                        <p>No players found</p>
                    )}
                </div>
            )}

            {/* Pagination Controls */}
            <div className="pagination-controls">
                <button onClick={prevPage} disabled={page === 1}>Previous</button>
                <span>Page {page} of {totalPages}</span>
                <button onClick={nextPage} disabled={page === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default PlayerList;