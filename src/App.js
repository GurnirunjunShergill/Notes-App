import React, { useState } from "react";
import './App.css';
import TopBar from "./components/TopBar";

const App = () =>{
    const [data, setData] = useState(''); 

    return (
        <div className="notes-application-container">
            <TopBar data={data} setData={setData}/>
            <textarea value={data} onChange={(event)=>setData(event.target.value)} className="text-area"/>
        </div>
    );
};

export default App;