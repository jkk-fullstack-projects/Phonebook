import { formStyles, inputStyles, appStyles } from '../styles/PhonebookStyles';

const SearchForm = ({ handleFilterChange, filterNames }) => {
    return (
        <>
            <h4 className={appStyles.header}>Show names beginning with:</h4>
            <div className={formStyles.container}>
                <form className="space-y-4">
                    <input 
                        className={inputStyles.searchFormInput}
                        onChange={handleFilterChange}
                        value={filterNames}
                    />
                </form>
            </div>
        </>
    );
};

export default SearchForm;