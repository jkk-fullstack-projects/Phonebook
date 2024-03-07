import axios from 'axios';
const baseUrl = '/api/persons';

const getAll = () => {
    return axios.get(baseUrl)
};

const createName = newObject => axios.post(baseUrl, newObject);

const updateName = (id, updatedObject) => axios.put(`${baseUrl}/${id}`, updatedObject);

const deleteName = id => axios.delete(`${baseUrl}/${id}`);
 
export default{ getAll, createName, updateName, deleteName };
  
