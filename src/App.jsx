import React from 'react'
import "./App.css"
import BlackHoleObserver from "./Landing/BlackHoleObserver.jsx";
import Cursor from "./Cursor/Cursor.jsx";
import SpaceScene from "./Landing/3D/spaceScene.jsx";

import SolarSystem3D from "./solarSystem/solarSystem.jsx"

const App = () => {
    return (
        <div className={"mainContainer"}>
            <SolarSystem3D/>
        </div>
    )
}
export default App
