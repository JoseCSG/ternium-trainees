import React from 'react'
import './Checkbox.css';

const Checkbox = () => {
  return (
    <div className='col-md-3 px-3 my-3'>
        <ul className="list-group" style={{ width: '18rem'}}>
            <li className="list-group-item">
                <input className="form-check-input me-1" type="checkbox" value="" aria-label="..."></input>
                    First checkbox
            </li>      
        </ul>
    </div>
  )
}

export default Checkbox