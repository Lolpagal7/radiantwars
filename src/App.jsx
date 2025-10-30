import React from 'react'
import "./App.css"


import BlackHoleObserver from "./Landing/BlackHoleObserver.jsx";
import Cursor from "./Cursor/Cursor.jsx";
import SpaceScene from "./Landing/3D/spaceScene.jsx";

import Narrator from "./Scrollers/narration.jsx"

import SolarSystem3D from "./solarSystem/solarSystem.jsx"
import Agents from './agents/agents.jsx';
import InputDesign from './solarSystem/agentSelector/InputDesign.jsx';

import { useState } from 'react';

const App = () => {

    const [blackHoleVisible, setBlackHoleVisible] = useState(true)
    const [solarSystemVisible, setSolarSystemVisible] = useState(false)
    const [narratorVisible, setNarratorVisible] = useState(false)

    const handleHandoverBlackHole = () =>{
        setTimeout(() => {
            setSolarSystemVisible(true)
            setBlackHoleVisible(false)
        }, 3000);
    }
    const handleHandoverSolarSystem = () =>{
        setNarratorVisible(true)
        setTimeout(() => {
            setSolarSystemVisible(false)
            setBlackHoleVisible(false)
        }, 3000);
    }

    return (
        <div className={"mainContainer"}>
            {blackHoleVisible && <BlackHoleObserver onCompletion={handleHandoverBlackHole} />}
            {solarSystemVisible && <SolarSystem3D handover={handleHandoverSolarSystem}/>}
            {narratorVisible && <Narrator/>}

            <Cursor/>
        </div>
    )
}
export default App
