import { inputStyles } from '../styles/PhonebookStyles.jsx'
const SearchForm = ({handleFilterChange, filterNames}) => {
    return (
        <>
            <h4 className="text-l font-bold mb-2 text-gray-900">Show names beginning with:</h4>
            <div className="bg-blue-100 p-4 rounded-lg mb-4">
                <form className="space-y-4">
                <input 
                    className={inputStyles.searchFormInput}
                    onChange={handleFilterChange}
                    value={filterNames}>
                </input>
                </form>
            </div>
        </>
    )
};

export default SearchForm;
    