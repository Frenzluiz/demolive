import React from 'react';
import { Link } from 'react-router-dom';

const PlayerCard = ({ player, handleDelete }) => {
    return (
        <div className="player-card" key={player.id}>
            <div className="player-info">
                {/* Show the player's image if available */}
                {player.image_link && (
                    <img
                        src={player.image_link} // Use image_link for the image URL
                        alt={`${player.name}'s image`}
                        className="player-image"
                        style={{ width: '150px', height: '150px' }} // Optional: Add custom styling
                    />
                )}
                <h2>{player.name}</h2>
                <p>{player.club}</p>
                <p>{player.nationality}</p>
            </div>

            <div className="player-actions">
                <Link to={`/edit-player/${player.id}`} className="edit-link">
                    <button className="edit-button">Edit</button>
                </Link>

                <button
                    className="delete-button"
                    onClick={() => handleDelete(player.id)} // Call handleDelete with player id
                >
                    Remove
                </button>
            </div>
        </div>

    );
};

export default PlayerCard;