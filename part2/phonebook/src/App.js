import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import module from './service/module'
import Notification from './components/Notification'


const App = () => {
//state
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState([])
  const [message, setMessage]= useState(null)
  const [color, setColor]= useState(null)

  useEffect(() => {
    module.getAll()
      .then(response => {
        setPersons(response)
        setSearch(response)
      })
  }, [])
  let updateNotification = (message,color) =>{
    setMessage(message)
    setColor(color)
    setTimeout(() => {
      setMessage(null)
    }, 5000);
  }


  let updatePersons = (persons)=>{
    setPersons(persons)
    setSearch(persons)  
  }
 let reset=() =>{
  setNewName('')
  setNewNumber('')
 }
 const isExist = () =>persons.filter(person => newName === person.name).length>0
 const checkId = () =>persons.filter(person => newName === person.name)[0].id
  
 const del = (id) =>{
  let target = persons.filter(p=>p.id===id)[0].name
   module.remove(id).then (res=>{
    let result = window.confirm(`delete contact ${target}?`)
    if (result){
      let updatedPersons = persons.filter( person => person.id!==id)
      updatePersons(updatedPersons )
      updateNotification(`Contact ${target} has been removed`,'green')  
     }
    }).catch( error=>{
      updateNotification(`Contact ${target} has already been removed from server`,'red')
    })
  }
  
  const changeNameHandle = (e) =>{
    setNewName(e.target.value)
  }
  const changeNumberHandle = (e) =>setNewNumber(e.target.value)
  const searchHandle = (e) =>{
    let filteredArr = persons.filter( a => a.name.toUpperCase().includes(e.target.value.toUpperCase()))
    setSearch(filteredArr)
  }
  const submitHandle = (e) => {
    e.preventDefault()
    let obj ={name:newName,number:newNumber}
    if(obj.name.length>0){
      if(isExist()){
        let id= checkId()
        let result = window.confirm(`update contact ${persons.filter(p=>p.id===id)[0].name}?`)
        if(result) module.update(id,obj).then( res=>{
          updatePersons(persons.map( p=> p.id===id? res:p))
          updateNotification(`${res.name} has been updated`,'green')
          }).catch(error=>{
            console.log(error)
            module.add(obj).then( res=>{
              updatePersons(persons.concat(res))
              updateNotification(`${res.name} added to the phonebook`,'green')
            })
          })
        }
        else module.add(obj).then( res => {
          updatePersons(persons.concat(res))
          updateNotification(`${res.name} added to the phonebook`,'green')
        }).catch(error=>{
          console.log(error)
        })
      reset()
    } else updateNotification('Please enter a name','red')
  }


  return (
    <div style={{margin:'20px'}}>
      <div style = {{height:'120px'}}>
        <h3 >Phonebook </h3>
        <Notification message={message} color={color}/>
      </div>
     
      <Filter searchHandle = {searchHandle}/>
      <h3>Add a new</h3>
      <PersonForm submitHandle ={submitHandle} changeNameHandle= {changeNameHandle} changeNumberHandle = {changeNumberHandle} newName ={newName} newNumber = {newNumber} />
      <h2>Numbers</h2>
       <Persons persons={search} del ={del} />
    </div>
  )
}
export default App
