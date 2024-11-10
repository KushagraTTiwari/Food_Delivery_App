import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the change here
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));  // Use createRoot instead
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

