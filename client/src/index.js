// Importing the React library and the createRoot function from react-dom
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import history from './history';
import App from './components/App';
import Blocks from './components/Blocks';
import './components/index.css';

// Using createRoot to create a root for rendering, passing the target root element
const root = createRoot(document.getElementById('root'));

// Rendering a React component (JSX syntax) inside the root using the render method
root.render(
  // This code is using React Router, a standard library for routing in React. It allows you to show different
  // components based on the current URL path.
  <Router history = {history}>
    <Routes>
      <Route path='/' element = {<App />} />
      <Route path='/blocks' element = {<Blocks />} />
    </Routes>
  </Router>
);


