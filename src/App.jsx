import { useState, useEffect } from 'react'
import axios from 'axios'

import EntryForm from './components/EntryForm.jsx'
import Persons from './components/Persons.jsx'
import SearchForm from './components/SearchForm.jsx'
import PersonCRUD from './services/PersonCRUD.jsx'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber] = useState('')
  const [filterNames, setFilternames] = useState('')

  useEffect(() => {
    console.log('effect')
    PersonCRUD
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const findNameFromPersons = (newName) => {
    let foundOrNot = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
    return foundOrNot;
  };

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    };

    if (findNameFromPersons(newName)) {
      alert(`${newName} exists already`)
    } else {
      axios
        .post('http://localhost:3001/persons', personObject)
        .then(response => {
          console.log(response)
        })
      setNewName('')
      setNewNumber('')
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  };
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  };

  const handleFilterChange = (event) => {
    setFilternames(event.target.value)
  }

  const handleDeletePerson = (id) => {
    const person = persons.find(person => person.id === id);
    const confirmDelete = window.confirm(`Delete ${person.name}?`)

    if (confirmDelete) {
    PersonCRUD.removeName(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          alert(`The person '${person.name}' was already deleted from the server `, error);
          setPersons(persons.filter(person => person.id !== id));
        });
    }
  };

  const filteredPersons = filterNames === '' ? persons : persons.filter(
    person => person.name.toLowerCase().includes(filterNames.toLowerCase())
  )

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mt-4 mb-4 text-gray-900">Phonebook</h2>
      <SearchForm filterNames={filterNames} handleFilterChange={handleFilterChange} /> 
      <h4 className="text-l font-bold mb-2 text-gray-900">Add new name</h4>
      <EntryForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h4 className="text-l font-semibold mt-6 mb-2 text-gray-800">Numbers</h4>
      <Persons 
        persons={filteredPersons} 
        deletePerson={handleDeletePerson}/>     
    </div>
  );
};

export default App;
