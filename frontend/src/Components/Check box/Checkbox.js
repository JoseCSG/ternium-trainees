import React from 'react'
import './Checkbox.css';

const Checkbox = ({nombre}) => {
  return (
    <div className='col-md-4 px-3 my-3'>
        <ul className="list-group" style={{ width: '15rem'}}>
            <li className="list-group-item">
                <input className="form-check-input me-1" type="checkbox" value="" aria-label="..."></input>
                    {nombre}
            </li>      
        </ul>
    </div>
  )
}

export default Checkbox