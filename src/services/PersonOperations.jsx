import axios from 'axios';
import Notification from '../utilities/Notification';
const baseUrl = 'http://localhost:3001/persons';

// Add a new person
export const addNewPerson = (personObject, setPersons, setNewName, setNewNumber) => {
  axios.post(baseUrl, personObject)
    .then(response => {
      setPersons(prevPersons => [...prevPersons, response.data]);
      setNewName('');
      setNewNumber('');
    })
    .catch(error => {
      console.error('There was an error adding the person:', error);
      alert('There was an error adding the person');
    });
};

// Update an existing person's number
export const confirmAndUpdatePerson = (existingPerson, personObject, setPersons, setNewName, setNewNumber) => {
  if (window.confirm(`${existingPerson.name} exists already, do you want to change the number?`)) {
    axios.put(`${baseUrl}/${existingPerson.id}`, personObject)
      .then(response => {
        setPersons(prevPersons => prevPersons.map(person => person.id === existingPerson.id ? response.data : person));
        setNewName('');
        setNewNumber('');
      })
      .catch(error => {
        console.error('There was an error updating the person:', error);
        alert(`There was an error updating ${existingPerson.name}'s number`);
      });
  }
};

export const deletePerson = (id, setPersons) => {
  return new Promise((resolve, reject) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this person?');
    if (isConfirmed) {
      axios.delete(`${baseUrl}/${id}`)
        .then(() => {
          setPersons(prevPersons => 
            prevPersons.filter(person => person.id !== id));
            console.log(`Deleting person with ID ${id}: Promise is fulfilled`);
          resolve();
        })
        .catch(error => {
          console.error('Error deleting the person:', error);
          console.log(`Deleting person with ID ${id}: Promise is rejected`);
          reject(error);
        });
    } else {
      // Resolve the promise even if the user cancels the deletion
      console.log(`Deletion canceled for ID ${id}: Promise is resolved without deletion`);
      resolve();
    }
  });
};