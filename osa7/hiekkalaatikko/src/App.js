import React, {useEffect, useState} from 'react';

const App = () => {
  console.log(1)
  useEffect(() => {
    console.log(2)
    setTimeout(()=>{
      console.log(3)
    }, 1000)
    console.log(4)
  })
  console.log(5)
  return (<div>hello</div>)
}

export default App;

// a. t.reduce((s, o) => s + o.v, 0)
// b.
// c.
// d.
// e. t.reduce((s, o) => s + v, 0)
// f.
// g. t.map(o => o.v).sum
// h.