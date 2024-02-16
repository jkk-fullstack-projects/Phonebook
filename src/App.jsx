import { useState } from 'react'
import EntryForm from './components/EntryForm.jsx'
import Persons from './components/Persons.jsx'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Artoo Detoo',
      number: '42-02' }
  ]) 
  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber] = useState('')

  const findNameFromPersons = (newName) => {
    console.log("boolean", persons)
    //name in persons;
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

  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  };
  
  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Phonebook</h2>
      <EntryForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">Numbers</h2>
      <Persons persons={persons} />     
    </div>
  );
};

export default App;
