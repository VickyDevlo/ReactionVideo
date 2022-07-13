import React from 'react'
import "../App.css"
import { SearchOutlined } from "@material-ui/icons";

const Nav = () => {
  const searchHandle = (e) => {
    console.log(e.target.value);
  };
  return (
   <nav className="Top-Nav"> 
      {/* <div className="SearchBax"> 
        <div className="SerchInput">
          <input
            type="text"
            placeholder="Search for people, tags,folders,and Looms"
            onChange={searchHandle}
          />
          <button className="SearchBtn">
            <SearchOutlined style={{ fontSize: "midium" }} />  
          </button>
        </div>
       </div>      */}
   <div className="img">
    <img src="https://cdn.loom.com/assets/[1]/library-empty-state-099b9b7945d18abb085b9a4da88ba3b3.png"/> 
   </div>
   <div className="heading">
    <h2>Record your first Loom</h2>
    <p>Try making a test video and share it. <br/> (No pressure, we're all friends here.)</p>
   </div>
   </nav>
  ) 
}

export default Nav