import React from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button';


const Login =() => {
    //const cuenta=postUser.username; //reemplazaria a handle
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    /*const handleOnSubmit = async (e) => {
        e.preventDefault();
        let result = await fetch(
        'http://localhost:3000/register', {
            method: "post",
            body: JSON.stringify({ name, email }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.warn(result);
        if (result) {
            alert("Data saved succesfully");
            setEmail("");
            setName("");
        }
    }*/

    const agregaUsuario = () => {
        fetch('http://localhost:4000/adduser',{method: "post",body:JSON.stringify({ username, password }),
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

      console.log(username);
      console.log(password);
  
    return (
      <>
        <h1 className='text-center my-5'> Ingresa a tu cuenta </h1>
        <form action="">
          <input type="text" placeholder="username"
             value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="password"
                  value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button variant="outline-success"
                  onClick={agregaUsuario}>submit</Button>
        </form>      
      </>
    );
}
  
export default Login;