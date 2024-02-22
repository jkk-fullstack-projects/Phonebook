import axios from 'axios';
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

// Delete a person
export const deletePerson = (id, setPersons) => {
  const isConfirmed = window.confirm('Are you sure you want to delete this person?');
  if (isConfirmed) {
    axios.delete(`${baseUrl}/${id}`)
      .then(() => {
        setPersons(prevPersons => prevPersons.filter(person => person.id !== id));
      })
      .catch(error => {
        console.error('Error deleting the person:', error);
        alert('There was an error deleting the person');
      });
  }
};
