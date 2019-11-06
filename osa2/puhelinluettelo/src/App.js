import React, { useState, useEffect } from 'react'
import numberService from './services/numbers'


const App = () => {
  const [person, setPersons] = useState ([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [notification, setNotification] = useState({msg: null, sort: null});

  useEffect( () => {
    numberService
        .getAll()
        .then(initialNumbers => {
          setPersons(initialNumbers)
    })
  }, []);


  const capitalize = ({ newName }) => {
    return newName.toLowerCase()
        .split(/ /)
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
  };

  const handlePersonChange = (event) => {
    //let temp = event.target.value;
    //temp = capitalize({temp});
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilterValue(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    const name = capitalize({ newName });
    const personObject =
        {
          name: name,
          number: newNumber
        };

    let onList = false;
    let personUpdated;

    person.forEach(value => {
        if (value.name === personObject.name) {
          onList=true;
          personUpdated = value;
          console.log("rivi58",personUpdated, "onlist", onList);
        }
    });

    if (!onList) {              // TOIMII
      numberService
          .create(personObject)
          .then(returnedPerson => {
            setPersons(person.concat(returnedPerson))
          setNewName('');
          setNewNumber('');
          setNotification({msg: `Added ${returnedPerson.name}`, sort: 'info'});
          setTimeout(() => {
            setNotification({msg:null, sort:null});
          }, 5000)
      })
    } else {
      const changeNumber = window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`);
      console.log("changeNumner", changeNumber);
      if (changeNumber) {
        numberService
            .update(personUpdated.id, personObject)
            .then (() => {

              setNotification({msg: `Updated phone number of ${personObject.name} to ${personObject.number}`, sort: "info"});
              setTimeout(() => {
                setNotification({msg:null, sort:null});
              }, 5000);
              numberService
                  .getAll()
                  .then(returnedPerson => {
                    setPersons(returnedPerson)
              })
        })
            .catch(error => {
            setNotification({msg: `Information of ${personObject.name} has been removed already`, sort: "error"});
            setTimeout(() => {
              setNotification({msg:null, sort:null});

            }, 5000);
        })
      }
    }


  };

  const deletePerson = id => {
    const deletablePerson = person.find(p => p.id === id);
    const sureToDelete = window.confirm(`Delete ${deletablePerson.name}?`);

  if(sureToDelete) {
    numberService
    .remove(id)
    .then(() => {
      setNotification({msg: `Removed ${deletablePerson.name}`, sort: "info"});
      setTimeout(() => {
        setNotification({msg: null, sort: null});
      }, 5000);
      numberService
      .getAll()
      .then(returnedPerson => {
        setPersons(returnedPerson);
      })
    })
  }};

  return (
      <div>
        <h2>Phonebook</h2>
        <Notification message={notification}/>
        <Filter filterValue={filterValue} handleFilter = {handleFilter}/>
        <h3>Add a new</h3>
        <PersonForm
            addPerson={addPerson}
            newName={newName}
            handlePersonChange={handlePersonChange}
            handleNumberChange={handleNumberChange}
            newNumber={newNumber}
        />
        <h3>Numbers</h3>
        <Numbers
          filterValue={filterValue}
          person={person}
          deletePerson={deletePerson}
        />
      </div>
  )
};

const Filter = ({ filterValue, handleFilter }) => {
  return (
      <form>
        <div>
          filter shown with <input
            value={filterValue}
            onChange={handleFilter}
        />
        </div>
      </form>
  )
};

const PersonForm = ({ addPerson, newName, handlePersonChange, newNumber, handleNumberChange }) => {
  return (
      <form onSubmit={addPerson}>
        <div>
          name: <input
            value={newName}
            onChange={handlePersonChange}
        />
          <div>
            number: <input
              value={newNumber}
              onChange={handleNumberChange}
          />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
};

const Numbers = ({ filterValue, person, deletePerson }) => {
  const namesToShow = person.filter(person => person.name.toLowerCase().includes(filterValue));

  const numbers = () => namesToShow.map( dude =>
      <li key={dude.name}>
        {dude.name} {dude.number}
        <button onClick={() => deletePerson(dude.id)}>delete</button>
      </li>
  );
  return (
      <div>
        <ul>
        {numbers()}
        </ul>
      </div>
  )
};

const Notification = ({ message }) => {
  if (message.sort === 'error' ) {
    console.log('errorissa');
    return (
        <div className="error">
          {message.msg}
        </div>
    )
  }

  if(message.msg === null) {
    console.log('ei virheitä');

    return null;
  }

  console.log('notifikaatio');
  return (
      <div className="notification">
        {message.msg}
      </div>
  )
};

export default App