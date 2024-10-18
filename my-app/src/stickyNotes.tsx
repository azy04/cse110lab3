import './App.css';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { ThemeContext, themes } from "./themeContext";
import Favorites from './favorites';
import React, { useState, useEffect, useContext } from 'react';
// import ThemeNotes from './themeNotes';

export const StickyNotes = () => {
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.personal,
    favorited: false,
  };
  const [createNote, setCreateNote] = useState(initialNote);
  const [notes, setNotes] = useState(dummyNotesList);
  const [favorites, setFavorites] = useState({});

  //Create Notes
  const createNoteHandler = (event: any) => {
    event.preventDefault();
    setNotes([...notes,{id: (notes[notes.length-1]).id+1, title: createNote.title, content: createNote.content, label: createNote.label, favorited: false}]);
  }

  //Remove Notes
  const removeNoteHandler = (props: any) => {
    setNotes(notes.filter((note: { id: any; }) => note.id != props))
  }

  //Update Favorite Notes
  const updateFavorites = () => {
    setFavorites(notes.filter(note => note.favorited == true));
  }

  //Set Themes
  const [currentTheme, setCurrentTheme] = useState(themes.light);
  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  document.body.style.backgroundColor = currentTheme.body;
  return (
    <div className='app-container'>
      <div>
        <form className="note-form" onSubmit={createNoteHandler}>
          <div>
            <input
              placeholder="Note Title"
              onChange={(event) =>
                setCreateNote({ ...createNote, title: event.target.value })}
              required
              style={{background: currentTheme.inputbackground, color: currentTheme.text}}
            >
            </input>
          </div>
    
          <div>
            <textarea
              placeholder="Note Content"
              onChange={(event) =>
                setCreateNote({ ...createNote, content: event.target.value })}
              required
              style={{background: currentTheme.inputbackground, color: currentTheme.text}}
            >
            </textarea>
          </div>
    
          <div>
            <select
              onChange={(event) =>
                setCreateNote({ ...createNote, label: event.target.value as unknown as Label })}
                style={{background: currentTheme.inputbackground, color: currentTheme.text}}
              >
              <option value={Label.personal}>Personal</option>
              <option value={Label.study}>Study</option>
              <option value={Label.work}>Work</option>
              <option value={Label.other}>Other</option>
            </select>
          </div>
    
          <div><button type="submit">Create Note</button></div>

          <h3 className='favorites-list-title' style={{color: currentTheme.text}}>List of Favorites:</h3>
          <div className="favorites-list">
            {notes.filter(note => note.favorited == true).map((note) => (
              <p key={note.id} style={{color: currentTheme.text}}> {note.title} </p>
            ))}
          </div>

          <div>
            <button onClick={toggleTheme} type='button'> Toggle Theme </button>
          </div>
        </form>
      </div>

      <div className="notes-grid">
        {notes.filter(note => note.id >= 0).map((note) => (
            <div
              key={note.id}
              className="note-item"
              data-favorited={note.favorited}
              id={note.id + ""}
              style={{
                background: currentTheme.background,
                color: currentTheme.text,
                border: currentTheme.background,
              }}
            >
              <div className="notes-header" onClick={updateFavorites}>
                <Favorites notes={notes} id={note.id}/>
                <button onClick={() => removeNoteHandler(note.id)} style={{color: currentTheme.text}}>x</button>
              </div>
              <h2 contentEditable={true} suppressContentEditableWarning={true} data-testid="title"> {note.title} </h2>
              <p contentEditable={true} suppressContentEditableWarning={true} data-testid="content"> {note.content} </p>
              <p contentEditable={true} suppressContentEditableWarning={true} data-testid="label"> {note.label} </p>
            </div>
        ))}
      </div>
    </div>
  );
}

export default StickyNotes;