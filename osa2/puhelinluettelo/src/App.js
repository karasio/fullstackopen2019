import React, { useState, useEffect } from 'react'
import numberService from './services/numbers'

const App = () => {
  const [person, setPersons] = useState ([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterValue, setFilterValue] = useState('');

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
    let personUpdated;
    person.forEach(value => {
        if (value.name === personObject.name) {
          onList=true;
          personUpdated = value;
        }
    });

    if (!onList) {
      numberService
          .create(personObject)
          .then(returnedPerson => {
            setPersons(person.concat(returnedPerson))
          setNewName('');
          setNewNumber('');
      })
    } else {
      const changeNumber = window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`);
      if (changeNumber) {
        console.log('changenumber', changeNumber);

        numberService
            .update(personUpdated.id, personObject)
            .then (() => {
              numberService
                  .getAll()
                  .then(returnedPerson => {
                    setPersons(returnedPerson)
              })

        })
      }
    }


  };

  const deletePerson = id => {
    const deletablePerson = person.find(p => p.id === id);
    const sureToDelete = window.confirm(`Delete ${deletablePerson.name}?`);
    //console.log(id);

  if(sureToDelete) {
    numberService
    .remove(id)
    .then(() => {
      numberService
      .getAll()
      .then(returnedPerson => {
        setPersons(returnedPerson)
      })
    })
  }

  ;


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
  console.log(person);
  const namesToShow = person.filter(person => person.name.toLowerCase().includes(filterValue));

  const numbers = () => namesToShow.map( dude =>
      <p key={dude.name}>
        {dude.name} {dude.number}
        <button onClick={() => deletePerson(dude.id)}>delete</button>
      </p>
  );
  return (
      <div>
        {numbers()}
      </div>
  )
};

export default App