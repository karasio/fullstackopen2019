import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import noteservice from './services/notes'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
      <div style={footerStyle}>
        <br />
        <em>Note app, Department of Computer Science, University of Helsinki 2019</em>
      </div>
  )
}

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState[''];

  useEffect(() => {
    noteservice
        .getAll()
        .then(initialNotes => {
          setNotes(initialNotes)
    })
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    console.log('logging in with', username, password);
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id);
    const changeNote = { ...note, important: !note.important }

    noteservice
        .update(id, changeNote).then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
        })
        .catch(error => {
          console.log("ERROR ",error);
          setErrorMessage(
              `Note "${note.content}" was already remover from server`
          );
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000);
        setNotes(notes.filter(n => n.id !== id))
    })
  };

  const rows = () => notesToShow.map(note =>
    <Note
      key={note.id}
      note={note}
      toggleImportance={ () => toggleImportanceOf(note.id)}
    />
  );



  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random()>0.5,
    };

   noteservice
       .create(noteObject)
       .then(returnedNote => {
         setNotes(notes.concat(returnedNote));
         setNewNote('');
   })
  };

  return (
      <div>
        <h1>Notes</h1>

        <Notification message={errorMessage} />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>

        <div>
          <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? 'important' : 'all'}
          </button>
        </div>
        <ul>
          {rows()}
        </ul>
        <form onSubmit={addNote}>
          <input
              value={newNote}
              onChange={handleNoteChange}
          />
          <button type="submit">save</button>
        </form>

        <Footer />
      </div>
  )
};

export default App;