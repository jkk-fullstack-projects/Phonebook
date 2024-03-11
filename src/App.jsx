import { useState, useEffect } from 'react'

import EntryForm from './components/EntryForm.jsx'
import Persons from './components/Persons.jsx'
import SearchForm from './components/SearchForm.jsx'
import PersonCRUD from './services/PersonCRUD.jsx'
import { addNewPerson, confirmAndUpdatePerson, deletePerson } from './services/PersonOperations.jsx'
import './index.css'
import Notification from './utilities/Notification.jsx'
import { appStyles } from './styles/PhonebookStyles';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterNames, setFilternames] = useState('');
  const [errorMessage, setErrorMessage] = useState({ message: '', msgType: 'success' });

  useEffect(() => {
    PersonCRUD.getAll()
      .then(response => {
        setPersons(response.data);
      })
      .catch(error => console.error('Error fetching persons:', error));
  }, []);

  const displayMessage = (msg, msgType = 'success', timeout = 10000) => {
    setErrorMessage({ message: msg, msgType: msgType }); // Update both message and type
    setTimeout(() => {
      setErrorMessage({ message: '', msgType: 'success' }); // Clear message after timeout
    }, timeout);
  };

  const handleAddOrUpdatePerson = (event) => {
    event.preventDefault();
    const personObject = { 
      name: newName, 
      number: newNumber };
    const existingPerson = persons.find(person => 
      person.name.toLowerCase() === newName.toLowerCase());

    if (existingPerson) {
      confirmAndUpdatePerson(existingPerson, personObject, setPersons)
      .then(successMessage => {
        setNewName('')
        setNewNumber('')
        displayMessage(successMessage, 'success')
      })
      .catch(errorMessage => {
        console.error(errorMessage)
        displayMessage(errorMessage.toString(), 'error')
      });
    } else {
    addNewPerson(personObject, setPersons)
    .then((successMessage) => {
      setNewName('');
      setNewNumber('');
      displayMessage(successMessage, 'success', 3000)
    })
    .catch(error => {
      const errorMessage = error.response && error.response.data.error ? error.response.data.error : "An error occurred";
      displayMessage(errorMessage, 'error', 5000);
    });
  }
};
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)};
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)};

  const handleFilterChange = (event) => {
    setFilternames(event.target.value)};

const handleDeletePerson = (id, name) => {
  console.log(`Deleting: ID = ${id}, Name = ${name}`);
  deletePerson(id, name, setPersons)
    .then(successMessage => {
      displayMessage(successMessage, 'success', 3000);
    })
    .catch(error => {
      const errorMessage = error?.response?.data?.error ?? `Error deleting ${name}. It may have already been removed. Refreshing list...`;
      console.error(errorMessage);
      displayMessage(errorMessage, 'error', 5000);
    })
    .finally(() => {
      PersonCRUD.getAll()
        .then(response => {
          setPersons(response.data);
        })
        .catch(error => {
          console.error('Error fetching the updated persons list:', error);
        });
    });
};

  const filteredPersons = filterNames === '' ? persons : persons.filter(
    person => person.name.toLowerCase().startsWith(filterNames.toLowerCase()));

  return (
    <div className={appStyles.container}>
      <h2 className={appStyles.header}>Phonebook</h2>
      <Notification message={errorMessage.message} msgType={errorMessage.msgType} />
      <SearchForm filterNames={filterNames} handleFilterChange={handleFilterChange} /> 
      <h4 className={appStyles.header}>Add new name</h4>
      <EntryForm
        addPerson={handleAddOrUpdatePerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h4 className="text-l font-semibold mt-6 mb-2 text-gray-800">Numbers</h4>
      <Persons persons={filteredPersons} deletePerson={handleDeletePerson}/>     
    </div>
  )
};


export default App;
