// ChatRoom.js
import React, { useState, useEffect } from 'react';
import { createConnection } from './chat';
import styles from './index.css';

const roomData = {
    facts: {
        title: 'Facts about me',
        info: ['Мой любимый цвет - белый.',
        'Моё тотемное животное - лань.',
        'Моё любимое число - 17.',
        'Мой любимый месяц - апрель.',
        'Мой любимый напиток - квас.',
        'Любимый фрукт - персик.',
        'Любимый овощ - помидор.',
        'Мои любимые цветы - лилии.',
        'Цвет глаз - светло-карие.',
        'Любимый день недели - понедельник.',
        'Любимый мультфильм - Двенадцать танцующих принцесс и Бэмби.',]
        // imageUrl: 'url_to_facts_image.jpg',
    },
    food: {
        title: 'Food Room',
        info: 'Discuss your favorite food and recipes in this room.',
        imageUrl: 'url_to_food_image.jpg',
    },
    music: {
        title: 'Music Room',
        info: 'Talk about your favorite music and artists here.',
        imageUrl: 'url_to_music_image.jpg',
    },
    films: {
        title: 'Films Room',
        info: 'Share your favorite movies and discuss films in this room.',
        imageUrl: 'url_to_films_image.jpg',
    },
}

function ChatRoom({ roomId }) {
    const [serverUrl, setServerUrl] = useState('https://localhost:123')
    const currentRoom = roomData[roomId]

    useEffect(() => {
        const connection = createConnection(serverUrl, roomId)
        connection.connect()
        return () => {
            connection.disconnect()
        }
    }, [roomId, serverUrl])

    return (
        <>
            <label>
                Server Url:{' '}
                <input value={serverUrl} onChange={(e) => setServerUrl(e.target.value)} />
            </label>
            <h1>{currentRoom.title}</h1>
            <p>{currentRoom.info}</p>
            <img src={currentRoom.imageUrl} alt={`Image for ${currentRoom.title}`} />
            {/* Добавьте другие интерактивные элементы или компоненты для каждой комнаты */}
        </>
    );
}

export default function App() {
    const [roomId, setRoomId] = useState('general');
    const [show, setShow] = useState(false);


    return (
        <>
            <label>
                Choose the chat room:{' '}
                <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
                    <option value="facts">Facts about me</option>
                    <option value="food">My favorite food</option>
                    <option value="music">My favorite music</option>
                    <option value="films">My favorite films</option>
                </select>
            </label>
            <button onClick={() => setShow(!show)}>
                {show ? 'Close chat' : 'Open chat'}
            </button>
            {show && <hr />}
            {show && <ChatRoom roomId={roomId} />}
        </>
    );
}
