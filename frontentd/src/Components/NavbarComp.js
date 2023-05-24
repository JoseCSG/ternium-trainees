import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import foto from "../Images/terniumlogo.png";
import { connect } from "react-redux";
import { onLogout } from "../api/auth";
import { unauthenticateUser } from "../redux/slices/auth_slice";

const NavbarComp = ({ isAuth, dispatch }) => {
  const logout = async () => {
    try {
      await onLogout();
      dispatch(unauthenticateUser());
      localStorage.removeItem("isAuth");
    } catch (error) {
      console.log(error.response);
    }
  };
  const isAdmin = false

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand>
          <img src={foto} alt="Imagen 1" width="100" height="40" />
        </Navbar.Brand>
        <Navbar.Brand href="#">Ternium Learning</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="mr-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            { isAuth ? 
              (
                <>
                <Nav.Link href="/">Inicio</Nav.Link>
                {!isAdmin && <Nav.Link href="/courses">Cursos</Nav.Link>}
                {!isAdmin && <Nav.Link href="/profile">Perfil</Nav.Link>}
                {!isAdmin && <Nav.Link href="/game">Juego</Nav.Link>}
                {isAdmin && <Nav.Link href="/data">Datos</Nav.Link>}
                <Nav.Link onClick={logout}>Log out</Nav.Link>
               </>
              ) : (
                <Nav.Link href="/login">Login</Nav.Link>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth, // Access the isAuth property correctly
  };
};

export default connect(mapStateToProps)(NavbarComp);