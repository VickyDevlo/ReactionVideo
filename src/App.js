import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Router from './Route';
import Content from './Content'
import Drow from './Drow'
import Navbar from './Components/SideMenu';
import PopUpMenu from './PopUpMenu';
// import Drowing from './Drowing'
import './App.css'
export default function App() {  
  return (
 <div className="App"> 
    {/* <Navbar/>  */}
      <Router/>   
    <Content/> 
    <PopUpMenu />  
    <Drow/>
 
  </div>   
  );
} 