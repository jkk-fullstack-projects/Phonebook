import ShowPerson from "./ShowPerson"

const Persons = ({ persons, deletePerson }) => {
    return (
        <ul className="bg-blue-200 p-4 rounded-lg divide-y divide-gray-200">
            {persons.map((person, index) =>
                <li key={index} className="py-2">
                    <ShowPerson 
                        person={person.name} 
                        number={person.number} 
                        handleDeletePerson={() => deletePerson(person.id)}/>
                </li>
            )}
        </ul>
    );
};

export default Persons