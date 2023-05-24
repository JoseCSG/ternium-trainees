import React from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import {onLogin} from '../../api/auth'
import {useDispatch} from 'react-redux'
import {authenticateUser} from '../../redux/slices/auth_slice'


const Login =() => {
    //const cuenta=postUser.username; //reemplazaria a handle

    const [values, setValues] = useState({
      email: '',
      password: '',
    })
    const [error, setError] = useState(false)

    const dispatch = useDispatch();

    const onSubmit = async (e) => {
      e.preventDefault()

      try {
        const response = await onLogin(values)  
        console.log(response.data)
        setValues(response.data);
        localStorage.setItem('user',response.data);
        if(response.data.success)
        {
          dispatch(authenticateUser())
          localStorage.setItem('isAuth', true);
          setError('')
        }
        else setError(response.data.errors[0].msg)
      } catch (errorResponse) {

      }
    }
    const onChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value })
    }
    /*
    const agregaUsuario = () => {
        fetch('http://localhost:4000/adduser',{method: "post",body:JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json'
        }})
        .then(res => res.json())
        //.then(data => {setName(data),setEmail(data)}) //aqui cambie
        .catch(error => {console.error(error)})
      }
      /*useEffect(() => {
        agregaUsuario()
      }, [])*/

    return (
      <>
        <h1 className='text-center my-5'> Ingresa a tu cuenta </h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <input required type="text" placeholder="username"
             value={values.email} name = 'email' onChange={(e) => onChange(e)} />
             <br></br>
          <input required type="password" placeholder="password"
                  value={values.password} name = 'password' onChange={(e) => onChange(e)} />

          <div style={{color: 'red', margin: '10px 0'}}>{error}</div>

          <Button type="submit" variant="outline-success">Submit</Button>
        </form>      
      </>
    );
}
  
export default Login;