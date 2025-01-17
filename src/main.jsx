import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import "./index.css";
import {AuthProvider}  from './Components/GlobalContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
   <AuthProvider>
      {/* bg-gradient-to-br from-gray-800 to-indigo-300 */}
   <div > 
    <App />
   </div>   
   </AuthProvider>
    

)
