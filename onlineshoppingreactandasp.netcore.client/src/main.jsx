import React from 'react';
import ReactDOM from 'react-dom/client';  // Import ReactDOM
import App from './App.jsx';
import { AuthProvider } from "./AuthContext";
import './index.css';

// Use ReactDOM.createRoot to render the App wrapped with AuthProvider
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
);