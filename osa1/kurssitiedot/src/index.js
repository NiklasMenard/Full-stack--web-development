import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
	return (
		<div>
		<p>
		{props.course.name}
		</p>
		</div>
		)
}

const Content = (props) => {
	return (
		<div>
		<p>
		{props.course.parts[0].name}
		<br/>
		{props.course.parts[1].name}
		<br/>
		{props.course.parts[2].name}
		</p>
		</div>
		)
}

const Total = (props) => {

	return (
		<div>
		<p>
		Total sum of courses is: {props.course.parts[0].exercises + 
			props.course.parts[1].exercises + props.course.parts[2].exercises}
			</p>
			</div>
			)
}

const App = () => {

	const course = {
		name: 'Half Stack application development',
		parts: [
		{
			name: 'Fundamentals of React',
			exercises: 10
		},
		{
			name: 'Using props to pass data',
			exercises: 7
		},
		{
			name: 'State of a component',
			exercises: 14
		}
		]
	}

	return (
		<div>
		<Header course={course}/>
		<Content course={course} />
		<Total course={course} />
		</div>
		)
	}

	ReactDOM.render(<App />, document.getElementById('root'))