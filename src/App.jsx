import React from 'react'
import "./App.css"
import BlackHoleObserver from "./Landing/BlackHoleObserver.jsx";
import Cursor from "./Cursor/Cursor.jsx";
const App = () => {

    return (
        <div className={"mainContainer"}>
            <BlackHoleObserver/>
            <Cursor/>
        </div>
    )
}
export default App
