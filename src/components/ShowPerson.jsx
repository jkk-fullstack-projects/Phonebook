import { buttonStyles } from '../styles/PhonebookStyles';

const ShowPerson = ({ person, handleDeletePerson }) => {
  return (
      <div className="flex justify-between items-center">
          <div className="text-sm font-medium text-gray-900">{person.name} | {person.number}</div>
          <button 
            onClick={() => 
              handleDeletePerson(person.id, person.name)} 
              className={buttonStyles.deleteButton}>Delete</button>

      </div>
  );
};


export default ShowPerson;