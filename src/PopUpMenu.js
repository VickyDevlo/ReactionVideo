import Form from 'react-bootstrap/Form';
import React from 'react'
import {HomeRounded } from '@material-ui/icons'
import './App.css'
const PopUpMenu = ({onClick}) => {
  return (
    <div className='Container'>
        <div className="TopNav">
            <div className="Logo">
            <span>Logo</span>
            </div>
            <div className="HomeIcon">
            <HomeRounded />
            </div>
        </div>
        <div className="MiddleSection">
            <div className="VideoSeting">
                <span>Video Settings</span>
                <div className='VideoSection'>

                <Form.Select aria-label="Default select example">
                    <option>Screen and Camera</option>
                <option value="2">Screen Only</option>
                <option value="3">Camera Only</option>
                </Form.Select>
                </div>
            </div>
            <div className="Recording">
                <span>Recording settings</span>
                <div className='section_one'>
                <Form.Select aria-label="Default select example">
                <option>Camera</option>
                </Form.Select>
                </div>

                <div className='section_two'>
                <Form.Select aria-label="Default select example">
                <option>Default - Microphone (Realtek Audio)</option>
                <option value="2">Communications - Microphone (Realtek Audio)</option>
                <option value="3">Microphone (Realtek Audio)</option>
                </Form.Select>
                </div>
            </div>
            <div className="StartBtn">
                <button onClick={onClick}>Start Recording</button>
            </div>
        </div>
        
    </div>
  )
}

export default PopUpMenu