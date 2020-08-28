import React from 'react'
const Notes = ({note}) =>{
    const{content}=note
    return(
        <li>{content}</li>
    )
}
export default Notes