import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import module from './service/module'
const App = () => {
//state
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState([])
  useEffect(() => {
    module.getAll()
      .then(response => {
        setPersons(response)
        setSearch(response)
      })
  }, [])

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
   module.remove(id).then (res=>{
    let result = window.confirm(`delete contact ${persons.filter(p=>p.id===id)[0].name}?`)
    if (result){
      let updatedPersons = persons.filter( person => person.id!==id)
      updatePersons(updatedPersons )   
     }
    })
  }
  const changeNameHandle = (e) =>{
    setNewName(e.target.value)
    document.getElementById('message').textContent = ''
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
        if(result){
          module.update(id,obj).then( res=>{
            const z= persons.map( p=> p.id===id? res:p)
             updatePersons(z)
             })
        }
        }
        else {
          module.add(obj).then( res => {
            updatePersons(res)
            
          })
        }
       reset()
    }
    else document.getElementById('message').textContent = 'Please enter a name'
  }

  return (
    <div style={{margin:'20px'}}>
      <h2>Phonebook</h2>
      <Filter searchHandle = {searchHandle}/>
      <h3>Add a new</h3>
      <PersonForm submitHandle ={submitHandle} changeNameHandle= {changeNameHandle} changeNumberHandle = {changeNumberHandle} newName ={newName} newNumber = {newNumber} />
      <h2>Numbers</h2>
       <p id ='message' style={{color:'red'}}></p>
       <Persons persons ={search} del={del} />
    </div>
  )
}
export default App
