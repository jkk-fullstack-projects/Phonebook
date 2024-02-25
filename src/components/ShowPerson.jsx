import { buttonStyles } from '../styles/PhonebookStyles';

const ShowPerson = ({ person, number, handleDeletePerson }) => {
  return (
      <div className="flex justify-between items-center">
          <div className="text-sm font-medium text-gray-900">{person} {number}</div>
          <button 
            onClick={handleDeletePerson}
            className={buttonStyles.deleteButton} >Delete </button>
      </div>
  );
};


export default ShowPerson;