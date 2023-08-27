import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import About from './About';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <Router>
      <div className="sidebar">
        <ul className="sidebar-nav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>

      <div className="content">
        <Route path="/about" component={About} />
        {/* Add more Route components for other pages if needed */}
      </div>
    </Router>
  );
};

export default Sidebar;
