import React from 'react';
import './App.css';
import {Routes, Route, useNavigate, BrowserRouter as Router} from 'react-router-dom';

import { Calculator } from './Pages/cfp-calculator/Calculator';
import Homepage from './Pages/Homepage';
import Diet from './Pages/cfp-calculator/Diet';
import Travels from './Pages/cfp-calculator/Travels';
import Electricity from './Pages/cfp-calculator/Electricity';


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
          {/* <Route
            path="/diet"
            element={<Calculator />}
          /> */}
          {/* <Route
            path="/electricity"
            element={<Electricity />}
          /> */}
        </Routes>
    </Router>
  );
}

export default App;
