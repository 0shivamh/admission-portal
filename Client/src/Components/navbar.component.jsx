import {Navbar, Container, Nav, NavDropdown} from "react-bootstrap";
import {Link, Navigate, useNavigate} from "react-router-dom";
import Logout from "./logout.component";
const NavbarComponent = () =>{

    const token = localStorage.getItem('token');

    const navigate=useNavigate();


    // const getAuth=()=>{
    //     const token = sessionStorage.getItem('token');
    //     console.log(token)
    //
    //     return token;
    // }
    //
    // useEffect(() => {
    //     getAuth();
    // }, [])

    return(

        <>
            <Navbar className="noprint" expand="lg shadow" bg="dark" style={{color:"white"}}>
                <Container>
                    <Navbar.Brand style={{color:"white"}} href="" >Admission Portal</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" style={{color:"white"}}>
                        <Nav className="ms-auto mb-2 mb-lg-0 d-fle"  style={{color:"white"}} >
                            <Nav.Link style={{color:"white"}} href="#home">Home</Nav.Link>
                            <Nav.Link style={{color:"white"}} href="#link">Link</Nav.Link>

                            {
                                token? <Logout/>:
                                    <Link  className="btn white-btn" to="/signin">Sign In</Link>
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default NavbarComponent;
