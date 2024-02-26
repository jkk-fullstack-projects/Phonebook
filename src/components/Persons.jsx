import ShowPerson from './ShowPerson'
import { ulStyles } from '../styles/PhonebookStyles.jsx'

const Persons = ({ persons, deletePerson }) => {
    return (
        <ul className={ulStyles.ulPerson}>
            {persons.map((person) =>
                <li key={person.id} className="py-2">
                    <ShowPerson 
                        person={person} 
                        handleDeletePerson={deletePerson}/>
                </li>
            )}
        </ul>
    );
};

export default Persons