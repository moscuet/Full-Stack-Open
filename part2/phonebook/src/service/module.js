
import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const remove = (id) =>{
  const baseUrl = `http://localhost:3001/persons/${id}`
     return axios.delete(baseUrl).then(res=>res.status)
}
const add = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { 
  getAll: getAll, 
  add, 
  update,
  remove
}
