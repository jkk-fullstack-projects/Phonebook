
import PersonCRUD from './PersonCRUD.jsx';

// Add a new person
export const addNewPerson = (personObject, setPersons) => {
  return new Promise((resolve, reject) => {
    PersonCRUD.createName(personObject)
      .then(response => {
        setPersons(prevPersons => [...prevPersons, response.data]);
        resolve(`Added '${response.data.name}' successfully`); 
    })
      .catch(error => {
        console.error('There was an error adding the person:', error);
        const message = error.response && error.response.data.error ? error.response.data.error : 'Unknown error';
        reject(new Error(message));
      });
  });
};

// Update an existing person's number
export const confirmAndUpdatePerson = (existingPerson, personObject, setPersons) => {
  return new Promise((resolve, reject) => {
    if (window.confirm(`${existingPerson.name} exists already, do you want to change the number?`)) {
      PersonCRUD.updateName(existingPerson.id, personObject)
        .then(response => {
          setPersons(prevPersons => prevPersons.map(person => 
            person.id === existingPerson.id ? response.data : person));
          resolve(`Updated '${existingPerson.name}' successfully`);
        })
        .catch(error => {
          console.error('There was an error updating the person:', error);
          reject(new Error(`There was an error updating ${existingPerson.name}'s number`));
        });
    } else {
      resolve('Update cancelled');
    }
  });
};

// deleting a name from the list, with error handling
export const deletePerson = (id, name, setPersons) => {
  return new Promise((resolve, reject) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete ${name}?`);
    if (isConfirmed) {
      PersonCRUD.deleteName(id)
        .then(() => {
          setPersons(prevPersons => prevPersons.filter(person => person.id !== id));
          resolve(`${name} was successfully deleted.`);
        })
        .catch(error => {
          console.error(`Error deleting ${name}:`, error);
          // showing the earlier names list before updating according to deletion
          setTimeout(() => {
            PersonCRUD.getAll()
              .then(response => {
                setPersons(response.data)
                reject(new Error(`Error deleting ${name}. It may have already been removed.`));
              })
              .catch(error => {
                console.error(`Error fetching the latest persons list: ${error}`)
              });
            }, 5000);
            reject(new Error(`Error deleting ${name}. It may have already been removed. Refreshing list...`))
        });
    } else {
      resolve('Deletion cancelled');
    }
  });
};