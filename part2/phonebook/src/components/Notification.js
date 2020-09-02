import React from 'react'
const Notification = ({ message,color }) => {
    const style = {
        border: `3px solid ${color}`,
        color:`${color}`
    }
    if (message === null) {
      return null
    }
    return (
      <div className="error" style ={style} >
        <h2>{message}</h2>
      </div>
    )
  }
  export default Notification