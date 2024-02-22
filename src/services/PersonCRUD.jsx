import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    return axios.get(baseUrl)
};

const create = newObject => {
    return axios.post(baseUrl, newObject)
};


const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
};

const removeName = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
    .then(response => {
        console.log(`deleted person with ID ${id}`, response.data)
        return response.data
    })
    .catch(error => {
        console.log(error)
    })
};

export default{ getAll, create, update, removeName };
  
