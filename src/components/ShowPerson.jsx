const ShowPerson = ({ person, number }) => {
  return (
      <div className="flex justify-between items-center">
          <div className="text-sm font-medium text-gray-900">{person} {number}</div>
      </div>
  );
};


export default ShowPerson;