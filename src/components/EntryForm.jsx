import { formStyles } from '../styles/PhonebookStyles';

const EntryForm = ({
    addPerson,
    newName,
    handleNameChange,
    newNumber,
    handleNumberChange
}) => (
    <div className={formStyles.container}>
        <form onSubmit={addPerson} className="space-y-4">
            <div>
                <label className={formStyles.label}>Name:</label>
                <input
                    value={newName}
                    onChange={handleNameChange}
                    className={formStyles.input}
                />
            </div>
            <div>
                <label className={formStyles.label}>Number:</label>
                <input
                    value={newNumber}
                    onChange={handleNumberChange}
                    className={formStyles.input}
                />
            </div>
            <div>
                <button
                    type="submit"
                    className={formStyles.submitButton}
                >
                    Add
                </button>
            </div>
        </form>
    </div>
);

export default EntryForm;