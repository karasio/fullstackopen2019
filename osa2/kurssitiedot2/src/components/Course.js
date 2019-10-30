import React from 'react';

const Course = (props) => {
  console.log('Course', props);

  const something = () => props.courses.map(course =>
      <div key={course.name}>
        <Header course={course} />
        <Content course={course}/>
        <Total course={course}/>
      </div>
  )
  return (
      <>
        {something()}
        </>
  )
};

const Header = ({course}) => {
  console.log('Header', course);
  return (
      <h1>{course.name}</h1>
  )
};

const Content = ({course}) => {
  const parts = () => course.parts.map(part =>
      <Part
          key={part.id}
          part={part}
      />
  );

  return (
      <>{parts()} </>
  )
};

const Part = ({part}) => {
  //console.log(part);
  return (
      <p>{part.name} - exercises on this section: {part.exercises}</p>
  )
};

const Total = ({course}) => {
  const result = course.parts.reduce( (sum, {exercises}) => sum + exercises , 0);

  return (
      <p>Number of exercises: {result}</p>
  )
};

export default Course