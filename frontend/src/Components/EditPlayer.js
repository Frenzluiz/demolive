import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPlayer, updatePlayer } from '../Services/PlayerService';

const EditPlayer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [player, setPlayer] = useState(null);
    const [error, setError] = useState(null);
    const [imageLink, setImageLink] = useState('');

    useEffect(() => {
        const fetchPlayerData = async () => {
            try {
                const data = await fetchPlayer(id);
                if (data) {
                    setPlayer(data);
                    setImageLink(data.image_link || '');
                } else {
                    setError('Player not found');
                }
            } catch (error) {
                setError('Error fetching player');
                console.error('Error fetching player data:', error);
            }
        };

        fetchPlayerData();
    }, [id]);

    const handleUpdate = async () => {
        try {
            // Prepare player data for update
            const updatedPlayer = {
                name: player.name,
                birth_year: player.birth_year,
                club: player.club,
                nationality: player.nationality,
                market_value: player.market_value,
                image_link: imageLink, // Use the image link from state
            };

            await updatePlayer(id, updatedPlayer); // Send the updated player data
            navigate('/'); // Navigate after successful update
        } catch (error) {
            setError('Error updating player: ' + error.message);
            console.error('Error updating player:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlayer((prevPlayer) => ({ ...prevPlayer, [name]: value }));
    };

    if (error) return <div>{error}</div>;

    return player ? (
        <div>
            <h2>Edit Player</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={player.name || ''}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Birth Year:
                    <input
                        type="text"
                        name="birth_year"
                        value={player.birth_year || ''}
                        onChange={handleChange}
                    />
                </label>
                <label>Club:</label>
                <input
                    type="text"
                    name="club"
                    value={player.club}
                    onChange={handleChange}
                    required
                />

                <label>Nationality:</label>
                <input
                    type="text"
                    name="nationality"
                    value={player.nationality}
                    onChange={handleChange}
                    required
                />
                <label>Market Value:</label>
                <input
                    type="number"
                    name="market_value"
                    value={player.market_value}
                    onChange={handleChange}
                    required
                />

                <label>Image Link:</label>
                <input
                    type="text"
                    value={imageLink}
                    onChange={(e) => setImageLink(e.target.value)} // Handle link change
                    placeholder="Enter image URL"
                />

                <button type="button" onClick={handleUpdate}>Update</button>
            </form>
        </div>
    ) : (
        <div>Loading...</div>
    );
};

export default EditPlayer;