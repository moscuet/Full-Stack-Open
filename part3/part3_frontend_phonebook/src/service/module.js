import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const remove = (id) =>{
  const url = `${baseUrl}/${id}`
     return axios.delete(url).then(res=>res.status)
}
const add = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(res => {
    console.log('module res',res.body)
    return res.data
  })
  .catch((error,req,res) => {
    console.log('module error',error)
      return {error:error.message}
  });
}
const update = (id,newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
return request.then(response => {
    return response.data
  })
}
export default { 
  getAll, 
  add, 
  update,
  remove
}
