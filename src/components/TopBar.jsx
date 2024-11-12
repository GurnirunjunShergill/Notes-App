import React from "react";
import "./TopBar.css";

const TopBar = ({
    data,
    setData
}) =>{
    const saveData = () =>{
        window.localStorage.setItem('data', data);
    }

    const clearData = () =>{
        window.localStorage.removeItem('data');
        setData('')
    }

    return(
        <div className="top-bar-container">
            <h1>Notes Application</h1>
            <div className="top-bar-button-container">
                <button onClick={clearData}>clear</button>
                <button onClick={saveData}>save</button>
            </div>
        </div>
    )
}

export default TopBar;