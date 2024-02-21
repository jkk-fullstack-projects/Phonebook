import { useState, useEffect } from 'react'
import axios from 'axios'

import EntryForm from './components/EntryForm.jsx'
import Persons from './components/Persons.jsx'
import SearchForm from './components/SearchForm.jsx'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber] = useState('')
  const [filterNames, setFilternames] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

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
      setPersons(persons.concat(personObject))
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

  const filteredPersons = filterNames === '' ? persons : persons.filter(
    person => person.name.toLowerCase().includes(filterNames.toLowerCase())
  )

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Phonebook</h2>
      <SearchForm filterNames={filterNames} handleFilterChange={handleFilterChange} /> 
      <h4 className="text-l font-bold mb-4 text-gray-900">Add new name</h4>
      <EntryForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h4 className="text-l font-semibold mt-6 mb-2 text-gray-800">Numbers</h4>
      <Persons persons={filteredPersons} />     
    </div>
  );
};

export default App;
