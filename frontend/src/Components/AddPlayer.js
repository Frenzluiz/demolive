import React, { useState } from 'react';
import { createPlayer } from '../Services/PlayerService';
import { useNavigate } from 'react-router-dom';

const AddPlayer = () => {
    const [player, setPlayer] = useState({
        name: '',
        birth_year: '',
        club: '',
        nationality: '',
        market_value: '',
        image_link: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlayer({
            ...player,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPlayer(player);
            navigate('/');
        } catch (error) {
            console.error("Error adding player:", error);
        }
    };

    return (
        <div className="add-player-container">
            <h1>Add Player</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={player.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Birth Year:</label>
                    <input
                        type="number"
                        name="birth_year"
                        value={player.birth_year}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Club:</label>
                    <input
                        type="text"
                        name="club"
                        value={player.club}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Nationality:</label>
                    <input
                        type="text"
                        name="nationality"
                        value={player.nationality}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Market Value:</label>
                    <input
                        type="number"
                        name="market_value"
                        value={player.market_value}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Image Link:</label>
                    <input
                        type="text"
                        name="image_link"
                        value={player.image_link}
                        onChange={handleChange}
                        placeholder="Enter image URL"
                    />
                </div>
                <button type="submit">Add Player</button>
            </form>
        </div>
    );
};

export default AddPlayer;