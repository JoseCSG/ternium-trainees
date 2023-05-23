import React, {Component} from "react";
import {Navbar,Nav} from "react-bootstrap";
import foto from "../Images/terniumlogo.png";


export default class NavbarComp extends Component{

    render(){
        const isAuth = true;
        return(
            <div>
                <Navbar bg="dark" variant={"dark"} expand="lg">
                    <Navbar.Brand>
                        <img src={foto} alt="Imagen 1" width="100" height="40"/>
                    </Navbar.Brand>
                    <Navbar.Brand href="#">Ternium Learning</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="mr-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="/">Home</Nav.Link>
                            {isAuth ? (
                                <>
                                <Nav.Link href="/profile">Profile</Nav.Link>
                                <Nav.Link href="/courses">Courses</Nav.Link>
                                </>
                            ) : ( 
                                <Nav.Link href="/login">Login</Nav.Link>
                            )}
                        </Nav>

                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}