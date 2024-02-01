// ChatRoom.js
import React, { useState, useEffect } from 'react';
import { createConnection } from './chat';
import styles from './index.css';
import "./App.css"


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
    },
    food: {
        title: 'My favorite food',
        info: ['1. Пельмени',
            '2.Уйгурский лагман',
            '3.Вареники',
            '4.Шорпо',
            '5.Тандырные самсы',
            '6.Манты с джусаем',
            '7.Рамён',
            '8.Плов',
        ],
    },
    music: {
        title: 'My favorite music',
        info: ['1.Sure Thing - Miguel',
        '2.Chicago - Michael Jackson ' ,
        '3.All I want is you - Miguel ' ,
        '4.Целовать другого - Иван Дорн ' ,
        '5.No scrubs - TLC' ,
        '6.Опус Магнум - Мот' ,
        '7.Только у любимой могут быть такие глаза - Ялла',
        '8.Let it be - JP Cooper ' ,
        '9.Нет тебя прекрасней - Юрий Антонов ' ,
        '10.Dive - Ed Sheeran'],

    },
    films: {
        title: 'My favorite films and serials',
        info: ['1.Запретный плод' ,
        '2.Красотка' ,
        '3.Один плюс один' ,
        '4.Зелёная книга' ,
        '5.Крёстный отец' ,
        '6.Мемуары гейши' ,
        '7.Война роз' ,
        '8.Гордость и предубеждение' ,
        '9.Унесённые ветром' ,
        '10.Движение вверх' ,
        ],
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
            <h1 className={"styles"}>{currentRoom.title}</h1>
            <ul>
                {currentRoom.info.map(item =>
                <li>
                    {item}
                </li>) }
            </ul>
        </>
    );
}

export default function App() {
    const [roomId, setRoomId] = useState('facts');
    const [show, setShow] = useState(false);


    return (
        <div className={"App"}>
            <label>
                Choose the chat room:{' '}
                <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
                    <option value="facts">Facts about me</option>
                    <option value="food">Food room</option>
                    <option value="music">Music room</option>
                    <option value="films">Films room</option>
                </select>
            </label>
            <button onClick={() => setShow(!show)}>
                {show ? 'Close chat' : 'Open chat'}
            </button>
            {show && <hr />}
            {show && <ChatRoom roomId={roomId} />}
        </div>
    );
}
