import React from 'react'

const Header = ({course}) => {
	return (
		<div>
		<h2>{course.name}</h2>
		</div>
		)
}

const Content = ({course}) => {

	const courses = course.parts
	const sum = courses.reduce( ( sum, { exercises } ) => sum + exercises , 0)
	return (
		<div>
		{courses.map(course => 
			<li key={course.id}>
			{course.name} {course.exercises}  
			</li>
			)}
		<p> Sum of courses is {sum} </p>
		</div>
		)
}


const Course = ({course}) => {
	return (
		<div>
		<Header course={course}/>
		<Content course={course} />
		</div>
		)
}


export default Course