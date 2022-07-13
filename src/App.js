import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Router from './Route';
import Content from './Content'
import Nav from './Components/Nav';
export default function App() {
  return (
 <div className="App">
  <Nav/>
      <Router/>
      <Content/>
  </div>   
  );
} 