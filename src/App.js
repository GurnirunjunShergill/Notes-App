import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [noteName, setNoteName] = useState();
  const [noteData, setNoteData] = useState();
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(undefined);

  useEffect(() => {
    const existingData = window.localStorage.getItem("data");
    if (existingData) {
      const parsedData = JSON.parse(existingData);
      setData(parsedData);
    }
  }, []);

  const saveNote = () => {
    setData((previousData) => {
      const updatedData = [...previousData];
      updatedData[selectedNoteIndex] = {
        noteName: noteName,
        noteData: noteData,
      };
      window.localStorage.setItem("data", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const deleteNote = (indexToRemove) => {
    setData(previousData => {
      const updatedData = previousData.filter((_, index) => index !== indexToRemove);
      window.localStorage.setItem("data", JSON.stringify(updatedData));
      setSelectedNoteIndex(undefined);
      return updatedData;
    });
  };

  const selectNote = (index) => {
    setNoteName(data[index].noteName);
    setNoteData(data[index].noteData);
    setSelectedNoteIndex(index);
  };

  const addNewNote = () => {
    setData((previousData) => [
      ...previousData,
      { noteName: "unnamed note", noteData: "" },
    ]);
    setSelectedNoteIndex(() => {
      if (data?.length > 0) {
        return data.length;
      } else {
        return 0;
      }
    });
    setNoteName("unnamed note");
    setNoteData("");
  };

  return (
    <div className="notes-application-container">
      <h1>Notes Application</h1>
      <div className="notes-application-content-container">
        <div className="saved-notes-container">
          {data.map((note, index) => {
            const {noteName} = note;
            return (
              <div
                key={index}
                className={`saved-note ${
                  selectedNoteIndex === index && `saved-note-selected`
                }`}
                onClick={() => selectNote(index)}
              >
                <p>{noteName}</p>
                <button onClick={() => deleteNote(index)}>delete</button>
              </div>
            );
          })}
          <button onClick={addNewNote}>add new note</button>
        </div>
        {selectedNoteIndex === undefined ? (
          <div className="note-content-container-empty" />
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default App;
