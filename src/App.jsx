import { useState, useEffect } from 'react'

import EntryForm from './components/EntryForm.jsx'
import Persons from './components/Persons.jsx'
import SearchForm from './components/SearchForm.jsx'
import PersonCRUD from './services/PersonCRUD.jsx'
import { addNewPerson, deletePerson } from './services/PersonOperations.jsx'
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

  const displayMessage = (msg, msgType = 'success', timeout = 3000) => {
    setErrorMessage({ message: msg, msgType: msgType }); // Update both message and type
    setTimeout(() => {
      setErrorMessage({ message: '', msgType: 'success' }); // Clear message after timeout
    }, timeout);
  };

  const handleAddPerson = (event) => {
    event.preventDefault();
    const personObject = { 
      name: newName, 
      number: newNumber };
    addNewPerson(personObject, setPersons)
    .then((successMessage) => {
      setNewName('');
      setNewNumber('');
      displayMessage(successMessage, 'success', 3000)
    })
    .catch((errorMessage) => {
      console.errot(errorMessage);
      displayMessage(errorMessage.toString(), 'error', 3000)
    });
  };
  

  const handleNameChange = (event) => {
    setNewName(event.target.value)};
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)};

  const handleFilterChange = (event) => {
    setFilternames(event.target.value)};

  const fetchLatestPersonsList = () => {
    PersonCRUD.getAll()
      .then(response => {
        setPersons(response.data);
        displayMessage('List updated.', 3000);
      })
      .catch(error => {
        console.error('Error fetching the latest persons list:', error);
      });
  };

  const handleDeletePerson = (id) => {
    deletePerson(id, setPersons)
      .then((successMessage) => {
        // Handle successful deletion
        console.log(successMessage); // Log or use the success message as needed
        displayMessage(successMessage, 'success', 3000); // Display success message
      })
      .catch((error) => {
        // Handle deletion error
        console.error(error);
        displayMessage('Error deleting, person may have already been removed.', 'error', 3000);
      });
  };

  const filteredPersons = filterNames === '' ? persons : persons.filter(
    person => person.name.toLowerCase().startsWith(filterNames.toLowerCase()));

  return (
    <div className={appStyles.container}>
      <h2 className={appStyles.header}>Phonebook</h2>
      <Notification message={errorMessage.message} msgType={errorMessage.msgType} />
      <SearchForm filterNames={filterNames} handleFilterChange={handleFilterChange} /> 
      <h4 className="text-l font-bold mb-2 text-gray-900">Add new name</h4>
      <EntryForm
        addPerson={handleAddPerson}
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
  )
};


export default App;
