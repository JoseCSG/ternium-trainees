import React from 'react'

const Tabs = ({text, page}) => {
  
  function getBackgroundColor(page)
  {
    if(text === page) return {backgroundColor: 'orange'}
    else return {backgroundColor: 'white'}
  }

  const color = getBackgroundColor(page)
  
  return (
    <div style={color} className='Tab'>
      <p>{text}</p>
    </div>
  )
}

export default Tabs