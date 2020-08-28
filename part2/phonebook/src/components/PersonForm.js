import React from 'react'
 const PersonForm= (props) =>{
     let {submitHandle,changeNameHandle,changeNumberHandle ,newName ,newNumber }=props
    return (
        <form onSubmit={submitHandle}>
        <div>
          name: <input onChange = {changeNameHandle} value={newName}/>
        </div>
        <div>
          number: <input onChange={changeNumberHandle} value= {newNumber} type = 'number'  />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
    )
}
export default PersonForm