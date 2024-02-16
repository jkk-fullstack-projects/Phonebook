
const EntryForm = ({
    addPerson,
    newName,
    handleNameChange,
    newNumber,
    handleNumberChange
  }) => (
    <div className="bg-blue-100 p-4 rounded-lg">
      <form onSubmit={addPerson} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            value={newName}
            onChange={handleNameChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Number:</label>
          <input
            value={newNumber}
            onChange={handleNumberChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );

export default EntryForm;

