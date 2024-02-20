    const SearchForm = ({handleFilterChange, filterNames}) => {
        return (
            <>
                <h4 className="text-l font-bold mb-4 text-gray-900">Show names beginning with:</h4>
                <div className="bg-blue-100 p-4 rounded-lg">
                    <form className="space-y-4">
                    <input 
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={handleFilterChange}
                        value={filterNames}>
                    </input>
                    </form>
                </div>
            </>
        )
    };
    
    export default SearchForm;
    