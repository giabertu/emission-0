import React from 'react';
import './App.css';
import {Routes, Route, useNavigate, BrowserRouter as Router} from 'react-router-dom';

import { Calculator } from './Pages/cfp-calculator/Calculator';
import Homepage from './Pages/Homepage';
import Diet from './Pages/cfp-calculator/Diet';

function App() {
 
  return (
    <Router>
      <Routes>
        <Route
            path='/'
            element={<Homepage />} />
          <Route
            path="/cfp-calculator"
            element={<Calculator />}
          />
          <Route
            path="/diet"
            element={<Diet />}
          />
        </Routes>
    </Router>
  );
}

export default App;
