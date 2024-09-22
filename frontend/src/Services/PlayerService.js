import axios from 'axios';

const API_URL = 'http://localhost:8000/api/players'; // This is correct

export const fetchPlayers = async (searchTerm = '', sortBy = 'name', page = 1) => {
    const response = await fetch(
        `${API_URL}?search=${searchTerm}&sort_by=${sortBy}&page=${page}`
    );
    const data = await response.json();
    return data;
};

export const fetchPlayer = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching player:', error);
        throw error;
    }
};

export const fetchPlayerById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching player by ID:', error);
        throw error;
    }
};

export const createPlayer = async (playerData) => {
    const response = await axios.post(API_URL, playerData);
    return response.data;
};

export const updatePlayer = async (id, playerData) => {
    const response = await fetch(`http://localhost:8000/api/players/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerData),
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }

    return response.json();
};

export const deletePlayer = async (playerId) => {
    try {
        const response = await axios.delete(`${API_URL}/${playerId}`); // Corrected URL
        return response.data;
    } catch (error) {
        console.error('Error deleting player:', error);
        throw error;
    }
};