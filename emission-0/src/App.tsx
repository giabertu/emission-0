import React from 'react';
import './App.css';
import {Routes, Route, useNavigate, BrowserRouter as Router} from 'react-router-dom';

import { Calculator } from './Pages/cfp-calculator/Calculator';
import Homepage from './Pages/Homepage';
import Diet from './components/Diet/Diet';
import Travels from './components/Travels/Travels';
import LandingPage from './Pages/LandingPage';


function App() {
 
  return (
    <Router>
      <Routes>
        <Route
            path='/'
            element={<LandingPage/>} />
          <Route
            path="/cfp-calculator"
            element={<Calculator />}
          />
        </Routes>
    </Router>
  );
}

export default App;
