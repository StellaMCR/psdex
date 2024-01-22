import { useState } from 'react'
import { ButtonSample } from './ListStyle'

function List() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ButtonSample onClick={() => {
        console.log(count+1)
        setCount(count+1)
      }}/>
    </>
  )
}

export default List
