// // index.js
// import React from 'react';
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx';
// import './index.css';
// import { BrowserRouter } from 'react-router-dom';
// import { GoogleOAuthProvider } from '@react-oauth/google';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <GoogleOAuthProvider clientId="736263222806-rvfa0ik33bp9k6mrdee9sqrvki6l4gp5.apps.googleusercontent.com">
//     <BrowserRouter>
//       <React.StrictMode>
//         <App />
//       </React.StrictMode>
//     </BrowserRouter>
//   </GoogleOAuthProvider>
// );


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="736263222806-ge18j4uubciif5rvlmjnbgdtmltl23tu.apps.googleusercontent.com">
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
