import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './CardCourse.css';

const CardCourse = ({nombre, img, status}) => {
  const getBackgroundColor = () => {
    if(status) return '#B8FF89'
    else return ''
  }
  
  return (
    <div className='col-md-3 px-3 my-3'>
      <Card className = 'h-100' style={{ width: '18rem'}}>
          <Card.Img variant="top" src={img} />
          <Card.Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: getBackgroundColor() , justifyContent: 'space-between', height: '100%' }}>
            <div style={{ textAlign: 'center' }}>
              <Card.Title className = 'mt-2'>{nombre}</Card.Title>
            </div>
            <Card.Text style={{ textAlign: 'justify' }}>

            </Card.Text>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="primary" className="btn-custom mt-auto">Empezar</Button>
            </div>
          </Card.Body>
      </Card>
  </div>
  )
}

export default CardCourse