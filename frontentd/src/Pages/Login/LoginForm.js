import React from "react";
import {useState} from "react";
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
        if(response.data.success) {
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
        <form onSubmit={(e) => onSubmit(e)}>
         <div className="d-flex justify-content-center">
            <input required type="text" placeholder="username"
              value={values.email} name = 'email' onChange={(e) => onChange(e)} />
         </div>

         <div className="d-flex justify-content-center my-1">
            <input required type="password" placeholder="password"
                    value={values.password} name = 'password' onChange={(e) => onChange(e)} />
         </div>

          <div style={{color: 'red', margin: '10px 0'}}>{error}</div>

          {/*<Button type="submit" variant="outline-success">Submit</Button>

          <div className="d-flex justify-content-center"> 
            <Button type="submit" variant="outline-success">Submit</Button>
          </div>
          */}

          <button type="submit" variant="outline-success" className="btn btn-secondary btn-sm button-center">Submit</button>


        </form>      
      </>
    );
}
   
export default Login;