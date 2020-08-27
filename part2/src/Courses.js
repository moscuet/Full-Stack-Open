
import React from 'react';

const Header = ({course }) =>  <h2>{course.name}</h2>
const Total = ({parts}) => {
  const sum = parts.reduce( (accu,curr,index)=>accu+curr.exercises,0)
  return <h3>Total of  {sum} exercises</h3>
}

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Content = ({ course }) => {
  let parts = course.parts.map( c => <Part key={c.id} part={c} />)
  return <div> {parts} </div>
}

const Course = ({course}) =>{
  return(
    <div>
      <Header course ={course}/>
      <Content course ={course}/>
      <Total parts={course.parts}/>
    </div>
  )
}
const Courses =  ({courses}) =>{
  let courseList = courses.map( course => <Course key = {course.id} course = {course}/>)
  return <div>{courseList}</div>
}
export default Courses