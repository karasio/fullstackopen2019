import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [person, setPersons] = useState ([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    console.log('effect');
    axios
        .get('http://localhost:3001/persons')
        .then(response => {
          setPersons(response.data);
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
    //console.log(event.target.value)
    setFilterValue(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    //console.log('button clicked ', event.target);

    const name = capitalize({ newName });
    const personObject =
        {
          name: name,
          number: newNumber
        };

    let onList = false;
    person.forEach(value => {
        if (value.name === personObject.name) {
          onList = true;
        }
    });
    onList ? alert(`${newName} is already added to phonebook`)
        : setPersons(person.concat(personObject));

    setNewName('');
    setNewNumber('');
  };

  return (
      <div>
        <h2>Phonebook</h2>
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

const Numbers = ({ filterValue, person }) => {

  const namesToShow = person.filter(person => person.name.toLowerCase().includes(filterValue));

  const numbers = () => namesToShow.map( dude =>
      <p key={dude.name}>
        {dude.name} {dude.number}
      </p>
  );
  return (
      <div>
        {numbers()}
      </div>
  )
};

export default App