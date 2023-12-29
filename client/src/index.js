// Importing the React library and the createRoot function from react-dom
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import './components/index.css';

// Using createRoot to create a root for rendering, passing the target root element
const root = createRoot(document.getElementById('root'));

// Rendering a React component (JSX syntax) inside the root using the render method
root.render(
  <App />,
);


