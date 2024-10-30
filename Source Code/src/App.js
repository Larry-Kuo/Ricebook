import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './Main/MainPage';
import Profile from './Profile/ProfilePage';
import Register from './Register/Register';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/main" element={<Main />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Register />} />
            </Routes>
        </Router>
    );
};

export default App;