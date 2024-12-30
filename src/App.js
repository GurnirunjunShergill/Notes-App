import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [noteName, setNoteName] = useState("unnamed note");
  const [noteData, setNoteData] = useState("");
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(undefined);

  useEffect(()=>{
    const existingData = window.localStorage.getItem('data');
    if(existingData){
        const parsedData = JSON.parse(existingData);
        setData(parsedData)
    }
  },[])

  const saveNote = () => {
    let updatedData;
    if (!isNaN(Number(selectedNoteIndex))) {
        data[selectedNoteIndex] = { noteName: noteName, noteData: noteData };
        updatedData = [...data];
    } else {
      updatedData = [...data, { noteName: noteName, noteData: noteData }];
    }
    setData(updatedData);
    !Number(selectedNoteIndex) && setSelectedNoteIndex(updatedData.length - 1);
    window.localStorage.setItem('data', JSON.stringify(updatedData))
  };

  const deleteNote = (indexToRemove) => {
    const updatedData = data.filter((_, index) => index !== indexToRemove);
    setData(updatedData);
    window.localStorage.setItem('data', JSON.stringify(updatedData))
  };

  const selectNote = (index) => {
    setNoteName(data[index].noteName);
    setNoteData(data[index].noteData);
    setSelectedNoteIndex(index);
  };

  const addNewNote = () =>{
    setSelectedNoteIndex(undefined);
    setNoteName('unnamed note');
    setNoteData('');
  }

  return (
    <div className="notes-application-container">
      <h1>Notes Application</h1>
      <div className="notes-application-content-container">
        <div className="saved-notes-container">
          {data?.map((note, index) => (
            <div
              key={index}
              className="saved-note"
              onClick={() => selectNote(index)}
            >
              <p>{note.noteName}</p>
              <button onClick={() => deleteNote(index)}>delete</button>
            </div>
          ))}
          <button onClick={addNewNote}>add new note</button>
        </div>
        <div className="note-content-container">
          <div className="note-content-name-container">
            <input
              onChange={(event) => setNoteName(event.target.value)}
              value={noteName}
              type="text"
              placeholder="Note Name"
            />
            <button onClick={saveNote}>save</button>
          </div>
          <textarea
            value={noteData}
            onChange={(event) => setNoteData(event.target.value)}
            className="text-area"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
