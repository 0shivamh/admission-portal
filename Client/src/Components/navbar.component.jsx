import {Navbar, Container, Nav, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import Logout from "./logout.component";
import {useEffect} from "react";

const NavbarComponent = () =>{

    const token = localStorage.getItem('token');

    useEffect(() => {

    }, [])

    return(
        <>
            <Navbar expand="lg shadow" bg="dark" style={{color:"white"}}>
                <Container>
                    <Navbar.Brand style={{color:"white"}} href="#home">Admission Portal</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" style={{color:"white"}}>
                        <Nav className="ms-auto mb-2 mb-lg-0 d-fle"  style={{color:"white"}} >
                            <Nav.Link style={{color:"white"}} href="#home">Home</Nav.Link>
                            <Nav.Link style={{color:"white"}} href="#link">Link</Nav.Link>

                            {
                                token? <Logout/>: <li className="nav-item">
                                    <Link to="/signin" className="btn white-btn"  >Sign In</Link>
                                </li>
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default NavbarComponent;
